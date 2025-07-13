import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Careers() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/categories`);
      return res.data;
    },
  });

  // Fetch careers
  const { data: careers, isLoading: loadingCareers } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/careers`);
      return res.data;
    },
  });

  // Filter careers by category and search
  const filteredCareers = (careers || []).filter((career: any) => {
    const matchesCategory = activeCategory ? String(career.category?._id || career.category) === activeCategory : true;
    const matchesSearch = search
      ? career.name.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const openCareerModal = (career: any) => {
    setSelectedCareer(career);
    setModalOpen(true);
  };

  const closeCareerModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedCareer(null), 300);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 text-center gradient-text text-shadow">
        Explore Tech Careers
      </h1>
      {loadingCategories ? (
        <div className="flex gap-2 justify-center mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-20 sm:w-24 rounded-full" />
          ))}
        </div>
      ) : !categories || categories.length === 0 ? (
        <div className="text-center text-gray-600 my-10 text-lg">No categories found. Please seed the database.</div>
      ) : (
        <Tabs
          value={activeCategory || (categories?.[0]?._id || "")}
          onValueChange={setActiveCategory}
          className="mb-6"
        >
          <TabsList className="flex flex-wrap gap-2 sm:gap-3 justify-center bg-accent/10 p-2 rounded-xl shadow mb-4 sm:mb-6">
            {categories?.map((cat: any) => (
              <TabsTrigger 
                key={cat._id} 
                value={cat._id} 
                className="capitalize px-3 sm:px-4 lg:px-5 py-2 rounded-full font-semibold text-accent-dark bg-white border-2 border-accent/30 shadow hover:bg-accent hover:text-white transition-all text-sm sm:text-base"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories?.map((cat: any) => (
            <TabsContent key={cat._id} value={cat._id}>
              <div className="flex justify-center my-4 sm:my-6">
                <Input
                  placeholder="Search for a role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-md border-accent/40 focus:border-accent focus:ring-accent/30 shadow-sm rounded-xl text-sm sm:text-base"
                />
              </div>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {loadingCareers ? (
                  Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 sm:h-48" />)
                ) : filteredCareers.length === 0 ? (
                  <div className="col-span-full text-center text-gray-600 py-8">No careers found.</div>
                ) : (
                  filteredCareers.map((career: any, idx: number) => (
                    <motion.div
                      key={career._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                      <Card
                        className="card-hover cursor-pointer animate-in fade-in slide-in-from-bottom-2 border-2 border-accent/20 rounded-2xl bg-white/90 backdrop-blur-sm h-full"
                        onClick={() => openCareerModal(career)}
                      >
                        <CardContent className="p-4 sm:p-6 flex flex-col gap-3 h-full">
                          <div className="flex items-start gap-2">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent-dark flex-1 leading-tight">{career.name}</h3>
                            {career.featured && <Badge className="bg-highlight text-white text-xs">Featured</Badge>}
                          </div>
                          <p className="text-gray-600 line-clamp-2 text-sm sm:text-base font-medium leading-relaxed flex-1">{career.description}</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                            {career.skills?.slice(0, 4).map((skill: string, i: number) => (
                              <Badge key={i} variant="secondary" className="bg-accent/10 text-accent-dark border border-accent/20 font-semibold text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      )}
      <AnimatePresence>
        {modalOpen && selectedCareer && (
          <Dialog open={modalOpen} onOpenChange={closeCareerModal}>
            <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-accent-dark">{selectedCareer.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm sm:text-base">
                  <div className="text-gray-700 leading-relaxed">{selectedCareer.description}</div>
                  <div>
                    <span className="font-semibold text-gray-900">Category:</span> {selectedCareer.category?.name || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Required Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedCareer.skills?.map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Learning Paths:</span>
                    <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                      {selectedCareer.learningPaths?.map((lp: string, i: number) => (
                        <li key={i} className="text-gray-700">{lp}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Useful Resources:</span>
                    <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                      {selectedCareer.resources?.map((res: any, i: number) => (
                        <li key={i}>
                          <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent-dark">
                            {res.title || res.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Typical Daily Tasks:</span>
                    <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                      {selectedCareer.dailyTasks?.map((task: string, i: number) => (
                        <li key={i} className="text-gray-700">{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
} 