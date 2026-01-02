"use client";

import { useState, useMemo } from "react";
import QueueCard from "./QueueCard";
import { Queue } from "./queue.types";
import mockQueuesData from "./mockQueues.json";

type SortOption = "waitTime" | "queueLength" | "alphabetical";
type LocationFilter = "all" | "Admin Block" | "Cafeteria" | "Clinic" | "Hostel" | "Sports Complex";
type StatusFilter = "all" | "open" | "paused" | "closed";

export default function QueueList() {
  const [sortBy, setSortBy] = useState<SortOption>("waitTime");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const queues: Queue[] = mockQueuesData as Queue[];

  const filteredAndSortedQueues = useMemo(() => {
    let filtered = [...queues];

    // Apply location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((queue) => queue.location === locationFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((queue) => queue.status === statusFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "waitTime":
          return a.waitTime - b.waitTime;
        case "queueLength":
          return a.queueLength - b.queueLength;
        case "alphabetical":
          return a.queueName.localeCompare(b.queueName);
        default:
          return 0;
      }
    });

    return sorted;
  }, [queues, sortBy, locationFilter, statusFilter]);

  const uniqueLocations = useMemo(() => {
    const locations = new Set(queues.map((q) => q.location));
    return Array.from(locations).sort();
  }, [queues]);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
    <div className="w-full max-w-7xl mx-auto p-8 bg-[#F8FAFC] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">CampusOR</h1>
          <p className="text-lg text-[#475569]">Queues</p>
        </div>

        {/* Controls on the right */}
        <div className="flex gap-4 items-center">
          {/* Sort */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#94A3B8] uppercase tracking-wide">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="waitTime">Wait Time</option>
              <option value="queueLength">Queue Length</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#94A3B8] uppercase tracking-wide">Filter</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value as LocationFilter)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#94A3B8] uppercase tracking-wide">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="paused">Paused</option>
              <option value="closed">Full</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queue Cards Grid */}
      {filteredAndSortedQueues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedQueues.map((queue) => (
            <QueueCard key={queue.queueId} queue={queue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[#475569]">
          <p>No queues found matching your filters.</p>
        </div>
      )}
    </div>
    </div>
  );
}

