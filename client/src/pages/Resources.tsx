import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Resources() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string | null>(null);

  // Fetch resources
  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/resources`);
      return res.data;
    },
  });

  // Get unique types for filtering
  const types = useMemo(() => {
    if (!resources) return [];
    return Array.from(new Set(resources.map((r: any) => r.type)));
  }, [resources]);

  // Filter resources by type and search
  const filteredResources = useMemo(() => {
    if (!resources) return [];
    return resources.filter((r: any) => {
      const matchesType = activeType ? r.type === activeType : true;
      const matchesSearch = search
        ? r.title.toLowerCase().includes(search.toLowerCase()) ||
          (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
        : true;
      return matchesType && matchesSearch;
    });
  }, [resources, activeType, search]);

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 text-center gradient-text text-shadow">
        Curated Tech Resources
      </h1>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 sm:h-40" />
          ))}
        </div>
      ) : !resources || resources.length === 0 ? (
        <div className="text-center text-gray-600 my-10 text-lg">No resources found. Please seed the database.</div>
      ) : (
        <>
          {types.length > 1 && (
            <Tabs
              value={activeType || "all"}
              onValueChange={val => setActiveType(val === "all" ? null : val)}
              className="mb-6"
            >
              <TabsList className="flex flex-wrap gap-2 sm:gap-3 justify-center bg-accent/10 p-2 rounded-xl shadow mb-4 sm:mb-6">
                <TabsTrigger 
                  value="all" 
                  className="capitalize px-3 sm:px-4 lg:px-5 py-2 rounded-full font-semibold text-accent-dark bg-white border-2 border-accent/30 shadow hover:bg-accent hover:text-white transition-all text-sm sm:text-base"
                >
                  All
                </TabsTrigger>
                {types.map((type: string) => (
                  <TabsTrigger 
                    key={type} 
                    value={type} 
                    className="capitalize px-3 sm:px-4 lg:px-5 py-2 rounded-full font-semibold text-accent-dark bg-white border-2 border-accent/30 shadow hover:bg-accent hover:text-white transition-all text-sm sm:text-base"
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
          <div className="flex justify-center my-4 sm:my-6">
            <Input
              placeholder="Search for a resource..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md border-accent/40 focus:border-accent focus:ring-accent/30 shadow-sm rounded-xl text-sm sm:text-base"
            />
          </div>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredResources.length === 0 ? (
              <div className="col-span-full text-center text-gray-600 py-8">No resources found.</div>
            ) : (
              filteredResources.map((res: any, idx: number) => (
                <motion.div
                  key={res._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <Card className="card-hover animate-in fade-in slide-in-from-bottom-2 border-2 border-accent/20 rounded-2xl bg-white/90 backdrop-blur-sm h-full">
                    <CardContent className="p-4 sm:p-6 flex flex-col gap-3 h-full">
                      <div className="flex items-start gap-2 mb-1">
                        <h3 className="text-lg sm:text-xl font-bold text-accent-dark flex-1 leading-tight">{res.title}</h3>
                        <Badge variant="secondary" className="capitalize bg-accent/10 text-accent-dark border border-accent/20 font-semibold text-xs">
                          {res.type}
                        </Badge>
                      </div>
                      {res.description && (
                        <p className="text-gray-600 text-sm sm:text-base font-medium line-clamp-2 leading-relaxed flex-1">
                          {res.description}
                        </p>
                      )}
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline text-sm mt-2 hover:text-accent-dark font-semibold"
                      >
                        Visit Resource
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </>
      )}
    </div>
  );
} 