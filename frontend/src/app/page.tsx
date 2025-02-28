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
  const [prompt, setPrompt] = useState("");
  const [quality, setQuality] = useState(50);
  const [promptStrength, setPromptStrength] = useState(0.5);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [imageFormat, setImageFormat] = useState("png");
  const [safetyCheckDisabled, setSafetyCheckDisabled] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          quality,
          promptStrength,
          aspectRatio,
          imageFormat,
          safetyCheckDisabled
        }),
      }).catch(err => {
        throw new Error(`Connection failed: ${err.message}`);
      });

      if (!response) {
        throw new Error('No response from server');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImages(data.images);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
          
          <div className="mt-8">
            <Button 
              onClick={handleGenerateImage} 
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              {isLoading ? "Generating..." : "Generate Image"}
            </Button>
          </div>
          
          {generatedImages.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Generated Images</h2>
              <div className="grid gap-4">
                {generatedImages.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Generated image ${index + 1}`}
                      className="rounded-lg shadow-lg w-full"
                    />
                    <button
                      onClick={() => window.open(imageUrl)}
                      className="absolute top-2 right-2 bg-black/50 text-white px-4 py-2 rounded hover:bg-black/70"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
