import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Admin() {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 text-center gradient-text text-shadow">
        Admin Dashboard
      </h2>
      <Tabs defaultValue="careers" className="mb-6">
        <TabsList className="flex flex-wrap gap-2 sm:gap-3 justify-center bg-accent/10 p-2 rounded-xl shadow mb-4 sm:mb-6">
          <TabsTrigger 
            value="careers" 
            className="capitalize px-3 sm:px-4 lg:px-5 py-2 rounded-full font-semibold text-accent-dark bg-white border-2 border-accent/30 shadow hover:bg-accent hover:text-white transition-all text-sm sm:text-base"
          >
            Careers
          </TabsTrigger>
          <TabsTrigger 
            value="categories" 
            className="capitalize px-3 sm:px-4 lg:px-5 py-2 rounded-full font-semibold text-accent-dark bg-white border-2 border-accent/30 shadow hover:bg-accent hover:text-white transition-all text-sm sm:text-base"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger 
            value="resources" 
            className="capitalize px-3 sm:px-4 lg:px-5 py-2 rounded-full font-semibold text-accent-dark bg-white border-2 border-accent/30 shadow hover:bg-accent hover:text-white transition-all text-sm sm:text-base"
          >
            Resources
          </TabsTrigger>
        </TabsList>
        <TabsContent value="careers">
          <Card className="border-2 border-accent/20 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-2">Career Management</h3>
              <p className="text-gray-600 text-sm sm:text-base">Career management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <Card className="border-2 border-accent/20 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-2">Category Management</h3>
              <p className="text-gray-600 text-sm sm:text-base">Category management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card className="border-2 border-accent/20 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-2">Resource Management</h3>
              <p className="text-gray-600 text-sm sm:text-base">Resource management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 