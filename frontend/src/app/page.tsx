"use client"

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  const [quality, setQuality] = useState(50);
  const [promptStrength, setPromptStrength] = useState(0.5);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [imageFormat, setImageFormat] = useState("png");
  const [safetyCheckDisabled, setSafetyCheckDisabled] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <main className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-16 text-center">
          Flux Uncensored Image Generator
        </h1>
        <div className="w-full mt-8">
          <Textarea 
            placeholder="Enter Your Prompt"
            className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-400"
          />
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Aspect Ratio</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-[200px] justify-between bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-300">
                  {aspectRatio || "Select Aspect Ratio"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-800">
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800 focus:text-white" onClick={() => setAspectRatio("16:9")}>
                  16:9
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800 focus:text-white" onClick={() => setAspectRatio("9:16")}>
                  9:16
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800 focus:text-white" onClick={() => setAspectRatio("1:1")}>
                  1:1
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Quality</label>
            <Slider
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Prompt Strength</label>
            <Slider
              value={[promptStrength]}
              onValueChange={(value) => setPromptStrength(value[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Image Format</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-[200px] justify-between bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-300">
                  {imageFormat || "Select Image Format"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-800">
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800 focus:text-white" onClick={() => setImageFormat("png")}>
                  png
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800 focus:text-white" onClick={() => setImageFormat("jpg")}>
                  jpg
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800 focus:text-white" onClick={() => setImageFormat("webp")}>
                  webp
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-6 flex items-center space-x-2">
            <Checkbox 
              id="safety-check" 
              checked={safetyCheckDisabled}
              onCheckedChange={(checked) => setSafetyCheckDisabled(checked as boolean)}
              className="border-gray-600"
            />
            <label 
              htmlFor="safety-check" 
              className="text-sm font-medium leading-none text-gray-300 cursor-pointer"
            >
              Disable Safety Check
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}
