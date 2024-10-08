"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check, Mic, Play, Pause, Upload, Download, Rocket, Lightbulb, GraduationCap, Smile, Zap, Briefcase, Sparkles, FastForward, Rewind } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

/**
 * LearnCast Component
 * 
 * This component represents the main interface for the LearnCast application.
 * It guides users through a step-by-step process to create an AI-generated podcast.
 */
export default function Learncast() {
  // State variables for managing the application flow
  const [step, setStep] = useState(0)
  const [sources, setSources] = useState<File[]>([])
  const [urls, setUrls] = useState("")
  const [analogies, setAnalogies] = useState("")
  const [emphasis, setEmphasis] = useState("")
  const [style, setStyle] = useState("")
  const [plan, setPlan] = useState("")
  const [showEmphasis, setShowEmphasis] = useState(false)
  const [isPlayingStingy, setIsPlayingStingy] = useState(false)
  const [isPlayingSigma, setIsPlayingSigma] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState("")

  // State variables for audio player functionality
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  // Refs for accessing DOM elements
  const audioRef = useRef<HTMLAudioElement>(null)
  const analogiesRef = useRef<HTMLTextAreaElement>(null)

  /**
   * Effect hook to handle showing the emphasis input when analogies are entered
   */
  useEffect(() => {
    const handleAnalogiesBlur = () => {
      if (analogies.trim() !== "") {
        setShowEmphasis(true)
      }
    }

    const analogiesElement = analogiesRef.current
    if (analogiesElement) {
      analogiesElement.addEventListener('blur', handleAnalogiesBlur)
    }

    return () => {
      if (analogiesElement) {
        analogiesElement.removeEventListener('blur', handleAnalogiesBlur)
      }
    }
  }, [analogies])

  /**
   * Handles file upload for podcast sources
   * @param e - The change event from the file input
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSources(Array.from(e.target.files))
    }
  }

  /**
   * Simulates the podcast generation process
   * In a real application, this would call an API to generate the podcast
   */
  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate API call with a 10-second delay
    setTimeout(() => {
      setIsGenerating(false)
      setAudioUrl("https://example.com/generated-podcast.mp3") // Replace with actual API response
      setStep(step + 1)
    }, 10000)
  }

  /**
   * Toggles play/pause for the audio player
   */
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  /**
   * Updates the current time of the audio player
   */
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  /**
   * Sets the duration of the audio when metadata is loaded
   */
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  /**
   * Seeks to a specific time in the audio
   * @param newTime - The time to seek to (in seconds)
   */
  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  /**
   * Changes the playback rate of the audio
   * @param newRate - The new playback rate
   */
  const handlePlaybackRateChange = (newRate: string) => {
    const rate = parseFloat(newRate)
    setPlaybackRate(rate)
    if (audioRef.current) {
      audioRef.current.playbackRate = rate
    }
  }

  /**
   * Formats time in seconds to a string (MM:SS)
   * @param time - Time in seconds
   * @returns Formatted time string
   */
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  /**
   * Checks if the current step is complete and can proceed to the next step
   * @param stepIndex - The index of the current step
   * @returns Boolean indicating if the step is complete
   */
  const isStepComplete = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return true
      case 1:
        return sources.length > 0 || urls.trim() !== ""
      case 2:
        return analogies.trim() !== "" && (!showEmphasis || emphasis.trim() !== "")
      case 3:
        return style !== ""
      case 4:
        return plan !== ""
      default:
        return false
    }
  }

  // Array of podcast style options
  const podcastStyles = [
    { value: "casual", icon: Zap, title: "Casual", description: "Relaxed and conversational tone" },
    { value: "professional", icon: Briefcase, title: "Professional", description: "Formal and business-like approach" },
    { value: "educational", icon: GraduationCap, title: "Educational", description: "Informative and instructional content" },
    { value: "entertaining", icon: Sparkles, title: "Entertaining", description: "Fun and engaging presentation" },
  ]

  // Array of steps in the podcast creation process
  const steps = [
    {
      title: "Welcome to LearnCast",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center space-x-2">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" fill="#3B82F6"/>
              <path d="M24 4L6 14L24 24L42 14L24 4Z" fill="#60A5FA"/>
              <path d="M24 44V24L42 14V34L24 44Z" fill="#2563EB"/>
              <path d="M24 44V24L6 14V34L24 44Z" fill="#1D4ED8"/>
              <path d="M34 19V29L24 34V24L34 19Z" fill="white"/>
            </svg>
            <h1 className="text-4xl font-bold text-blue-600">LearnCast</h1>
          </div>
          <p className="text-xl text-gray-600">A revolutionary new way to learn with instant AI podcasts</p>
          <Button onClick={() => setStep(1)} className="mt-4 bg-blue-500 hover:bg-blue-600 rounded-full px-6 py-2 text-white">
            Start Learning
          </Button>
        </div>
      ),
    },
    {
      title: "Add Your Sources",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-4 text-blue-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, TXT, DOC, or DOCX (MAX. 10MB)</p>
              </div>
              <Input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} multiple />
            </Label>
          </div>
          {sources.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Uploaded files:</h3>
              <ul className="list-disc pl-5">
                {sources.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <Label htmlFor="urls">Optional URLs (one per line):</Label>
            <Textarea
              id="urls"
              placeholder="Enter URLs to additional resources..."
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Customize Your Podcast",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="analogies">Analogies to use:</Label>
            <Textarea
              id="analogies"
              ref={analogiesRef}
              placeholder="Enter analogies to explain the content..."
              value={analogies}
              onChange={(e) => setAnalogies(e.target.value)}
              className="mt-1 h-32"
            />
          </div>
          <AnimatePresence>
            {showEmphasis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="emphasis">What to emphasize:</Label>
                <Textarea
                  id="emphasis"
                  placeholder="Enter key points to emphasize..."
                  value={emphasis}
                  onChange={(e) => setEmphasis(e.target.value)}
                  className="mt-1 h-32"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    },
    {
      title: "Choose Your Style",
      content: (
        <RadioGroup value={style} onValueChange={setStyle} className="grid grid-cols-2 gap-4">
          {podcastStyles.map((item) => (
            <Label
              key={item.value}
              htmlFor={item.value}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                style === item.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <RadioGroupItem value={item.value} id={item.value} className="sr-only" />
              <item.icon className="w-8 h-8 mb-2 text-blue-500" />
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-center text-gray-500">{item.description}</div>
            </Label>
          ))}
        </RadioGroup>
      ),
    },
    {
      title: "Choose Your Plan",
      content: (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className={`relative overflow-hidden transition-all duration-300 ${plan === 'stingy' ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader>
              <CardTitle>Stingy</CardTitle>
              <CardDescription>Basic plan for quick podcasts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$1</div>
              <ul className="space-y-2">
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-blue-500" /> 3-5 minutes long</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-blue-500" /> Basic audio quality</li>
                <li className="flex items-center text-gray-500"><Download className="mr-2 h-4 w-4" /> No download</li>
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <Button className="text-sm" variant="outline" onClick={() => setIsPlayingStingy(!isPlayingStingy)}>
                  {isPlayingStingy ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  Sample
                </Button>
                <Button className="text-sm" onClick={() => setPlan('stingy')} variant={plan === 'stingy' ? 'default' : 'outline'}>
                  Select Stingy
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className={`relative overflow-hidden transition-all duration-300 ${plan === 'sigma' ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-bl">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle>Sigma</CardTitle>
              <CardDescription>Premium plan for in-depth learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$3</div>
              <ul className="space-y-2">
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-blue-500" /> 10-15 minutes long</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-blue-500" /> Advanced audio quality</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-blue-500" /> Download option</li>
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <Button className="text-sm" variant="outline" onClick={() => setIsPlayingSigma(!isPlayingSigma)}>
                  {isPlayingSigma ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  Sample
                </Button>
                <Button className="text-sm" onClick={() => setPlan('sigma')} variant={plan === 'sigma' ? 'default' : 'outline'}>
                  Select Sigma
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "Generating Your Podcast",
      content: (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700">Generating your podcast...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      ),
    },
    {
      title: "Your Generated Podcast",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <Button onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Rewind className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <FastForward className="h-4 w-4" />
                </Button>
                <Select value={playbackRate.toString()} onValueChange={handlePlaybackRateChange}>
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="relative w-full h-24 bg-gray-200 rounded">
              {/* Placeholder for waveform visualization */}
              <div className="absolute inset-0 bg-blue-500 opacity-50" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => handleSeek(value[0])}
          />
          {plan === 'sigma' && (
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download Podcast
            </Button>
          )}
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            hidden
          />
        </div>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full shadow-xl">
            <CardHeader>
              {step > 0 && <CardTitle className="text-2xl font-bold">{steps[step].title}</CardTitle>}
            </CardHeader>
            <CardContent>
              {steps[step].content}
            </CardContent>
            {step > 0 && step < steps.length - 2 && (
              <CardFooter className="flex justify-between">
                <Button onClick={() => {
                  setStep(step - 1);
                  if (step === 4) setPlan("");
                }} variant="outline" className="rounded-full">
                  Previous
                </Button>
                {step < steps.length - 2 && (
                  <Button 
                    onClick={() => step === 4 ? handleGenerate() : setStep(step + 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                    disabled={!isStepComplete(step)}
                  >
                    {step === 4 ? "Generate" : "Next"}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
      {step > 0 && step < steps.length - 1 && (
        <div className="mt-4">
          <Progress value={(step / (steps.length - 2)) * 100} className="w-full" />
        </div>
      )}
    </div>
  )
}