
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  Copy,
  Edit,
  FileText,
  Grid,
  Image as ImageIcon,
  LayoutDashboard,
  List,
  MessageSquare,
  Pen,
  Plus,
  Save,
  Settings,
  Trash,
  Upload,
  Video,
  X,
} from "lucide-react";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CourseBuilder() {
  const [activeTab, setActiveTab] = useState("content");
  const [courseType, setCourseType] = useState("standard");
  
  // Sample content blocks for demonstration
  const [contentBlocks, setContentBlocks] = useState([
    { id: 1, type: "text", title: "Introduction to the Course", content: "Welcome to this course! Here's what you'll learn...", expanded: true },
    { id: 2, type: "video", title: "Getting Started", url: "https://example.com/video.mp4", duration: "10:25", expanded: false },
    { id: 3, type: "quiz", title: "Module 1 Quiz", questions: 5, expanded: false },
  ]);

  // Course structure (modules and lessons)
  const [courseStructure, setCourseStructure] = useState([
    { 
      id: 1, 
      title: "Introduction to the Course", 
      expanded: true,
      lessons: [
        { id: 1, title: "Welcome and Overview", duration: "5:20" },
        { id: 2, title: "Course Objectives", duration: "8:15" },
        { id: 3, title: "How to Get the Most From This Course", duration: "6:45" },
      ] 
    },
    { 
      id: 2, 
      title: "Core Concepts", 
      expanded: false,
      lessons: [
        { id: 4, title: "Key Principles", duration: "12:30" },
        { id: 5, title: "Understanding the Framework", duration: "15:45" },
        { id: 6, title: "Practical Applications", duration: "10:20" },
      ] 
    },
    { 
      id: 3, 
      title: "Advanced Techniques", 
      expanded: false,
      lessons: [
        { id: 7, title: "Deep Dive into Implementation", duration: "20:15" },
        { id: 8, title: "Case Studies", duration: "18:40" },
        { id: 9, title: "Expert Interviews", duration: "25:10" },
      ] 
    },
  ]);

  const toggleModuleExpansion = (moduleId) => {
    setCourseStructure(modules => 
      modules.map(module => 
        module.id === moduleId 
          ? { ...module, expanded: !module.expanded } 
          : module
      )
    );
  };

  const toggleContentExpansion = (blockId) => {
    setContentBlocks(blocks => 
      blocks.map(block => 
        block.id === blockId 
          ? { ...block, expanded: !block.expanded } 
          : block
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Course Builder</h1>
            <p className="text-gray-600">Create and manage your course content, structure, and assessments.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline">Preview</Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Course
            </Button>
          </div>
        </div>

        {/* Course Type Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${courseType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setCourseType('standard')}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  {courseType === 'standard' && (
                    <Badge className="bg-blue-500">Selected</Badge>
                  )}
                </div>
                <h3 className="font-bold mb-1">Standard Course</h3>
                <p className="text-sm text-gray-600">Traditional course with modules, lessons, and assessments.</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer hover:border-purple-500 ${courseType === 'workshop' ? 'border-purple-500 bg-purple-50' : ''}`}
                onClick={() => setCourseType('workshop')}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Video className="h-5 w-5 text-purple-600" />
                  </div>
                  {courseType === 'workshop' && (
                    <Badge className="bg-purple-500">Selected</Badge>
                  )}
                </div>
                <h3 className="font-bold mb-1">Interactive Workshop</h3>
                <p className="text-sm text-gray-600">Live sessions with interactive exercises and discussions.</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer hover:border-green-500 ${courseType === 'microlearning' ? 'border-green-500 bg-green-50' : ''}`}
                onClick={() => setCourseType('microlearning')}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  {courseType === 'microlearning' && (
                    <Badge className="bg-green-500">Selected</Badge>
                  )}
                </div>
                <h3 className="font-bold mb-1">Microlearning</h3>
                <p className="text-sm text-gray-600">Bite-sized lessons for quick learning on specific topics.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Course Builder Tabs */}
        <Tabs defaultValue="content" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">
              <Pen className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="structure">
              <List className="h-4 w-4 mr-2" />
              Structure
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="assessments">
              <MessageSquare className="h-4 w-4 mr-2" />
              Assessments
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Course Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Course Title</label>
                      <Input placeholder="Enter course title" defaultValue="Advanced Data Science Techniques" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Short Description</label>
                      <Textarea 
                        placeholder="Brief description (max 150 characters)" 
                        rows={2}
                        defaultValue="Master advanced data science techniques for real-world applications and problem-solving."
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Detailed Description</label>
                      <Textarea 
                        placeholder="Detailed course description" 
                        rows={5}
                        defaultValue="This comprehensive course covers advanced data science concepts and techniques including statistical methods, machine learning algorithms, and data visualization. You'll learn how to apply these skills to solve real-world problems across various industries."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Difficulty Level</label>
                        <Select defaultValue="intermediate">
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Estimated Duration</label>
                        <div className="flex gap-2">
                          <Input type="number" placeholder="Hours" defaultValue="10" />
                          <Select defaultValue="weeks">
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hours">Hours</SelectItem>
                              <SelectItem value="days">Days</SelectItem>
                              <SelectItem value="weeks">Weeks</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Category</label>
                      <Select defaultValue="data-science">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        {["Data Science", "Machine Learning", "Python", "Statistics"].map((tag) => (
                          <Badge key={tag} variant="secondary" className="pl-2 pr-1 text-sm flex items-center">
                            {tag}
                            <button className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-gray-200">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Add new tag" />
                        <Button variant="outline" size="sm">Add</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Course Thumbnail</label>
                      <div className="border-2 border-dashed rounded-md p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon className="h-10 w-10 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <p>Drag and drop an image, or</p>
                            <Button variant="ghost" size="sm">Browse files</Button>
                          </div>
                          <p className="text-xs text-gray-500">16:9 ratio recommended (min 720x405px)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Prerequisites</label>
                      <div className="bg-gray-50 rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between border p-2 rounded bg-white">
                          <span>Basic Python Programming</span>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between border p-2 rounded bg-white">
                          <span>Introduction to Statistics</span>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Input placeholder="Add prerequisite" />
                          <Button variant="outline" size="sm">Add</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Learning Outcomes</label>
                      <div className="bg-gray-50 rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between border p-2 rounded bg-white">
                          <span>Build machine learning models for real-world applications</span>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between border p-2 rounded bg-white">
                          <span>Analyze and visualize complex datasets</span>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between border p-2 rounded bg-white">
                          <span>Apply advanced statistical methods</span>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Input placeholder="Add learning outcome" />
                          <Button variant="outline" size="sm">Add</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Details</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Course Structure Tab */}
          <TabsContent value="structure" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Course Structure</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Module
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courseStructure.map((module) => (
                        <div key={module.id} className="border rounded-md overflow-hidden">
                          <div 
                            className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                            onClick={() => toggleModuleExpansion(module.id)}
                          >
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-3">
                                {module.id}
                              </div>
                              <h3 className="font-medium">{module.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {module.lessons.length} lessons
                              </Badge>
                              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500" onClick={(e) => e.stopPropagation()}>
                                {module.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          
                          {module.expanded && (
                            <div className="p-3 space-y-2">
                              {module.lessons.map((lesson) => (
                                <div key={lesson.id} className="flex items-center justify-between p-2 border rounded-md">
                                  <div className="flex items-center">
                                    <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs mr-2">
                                      {lesson.id}
                                    </div>
                                    <span>{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {lesson.duration}
                                    </Badge>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              
                              <Button variant="outline" size="sm" className="w-full">
                                <Plus className="h-4 w-4 mr-1" />
                                Add Lesson
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Module Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Select a module to edit its details or create a new one.
                    </p>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Module Title</label>
                      <Input placeholder="Enter module title" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Module Description</label>
                      <Textarea placeholder="Describe what this module covers" rows={3} />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Learning Objectives</label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input placeholder="Add a learning objective" />
                          <Button variant="outline" size="sm">Add</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Module</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Course Content Tab */}
          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Blocks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop blocks to build your lesson content.
                    </p>
                    
                    {[
                      { type: "text", icon: <FileText className="h-4 w-4 mr-2" />, name: "Text Block" },
                      { type: "video", icon: <Video className="h-4 w-4 mr-2" />, name: "Video" },
                      { type: "image", icon: <ImageIcon className="h-4 w-4 mr-2" />, name: "Image" },
                      { type: "quiz", icon: <MessageSquare className="h-4 w-4 mr-2" />, name: "Quiz" },
                      { type: "assignment", icon: <Pen className="h-4 w-4 mr-2" />, name: "Assignment" },
                      { type: "file", icon: <Upload className="h-4 w-4 mr-2" />, name: "File Upload" },
                    ].map((block) => (
                      <Button 
                        key={block.type} 
                        variant="outline" 
                        className="w-full justify-start text-left mb-1"
                      >
                        {block.icon}
                        {block.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Current Lesson</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue="lesson1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lesson1">Welcome and Overview</SelectItem>
                        <SelectItem value="lesson2">Course Objectives</SelectItem>
                        <SelectItem value="lesson3">How to Get the Most From This Course</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Module:</span>
                        <span className="text-sm">Introduction to the Course</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Duration:</span>
                        <span className="text-sm">5:20</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Content blocks:</span>
                        <span className="text-sm">3</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Lesson Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Lesson Content</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Compass className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm">
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contentBlocks.map((block) => (
                        <div key={block.id} className="border rounded-md overflow-hidden">
                          <div 
                            className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                            onClick={() => toggleContentExpansion(block.id)}
                          >
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                {block.type === "text" ? (
                                  <FileText className="h-4 w-4" />
                                ) : block.type === "video" ? (
                                  <Video className="h-4 w-4" />
                                ) : (
                                  <MessageSquare className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{block.title}</h3>
                                <p className="text-xs text-gray-500">
                                  {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                                  {block.type === "video" && block.duration && ` • ${block.duration}`}
                                  {block.type === "quiz" && block.questions && ` • ${block.questions} questions`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                {block.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          
                          {block.expanded && (
                            <div className="p-4">
                              {block.type === "text" && (
                                <div>
                                  <Textarea 
                                    defaultValue={block.content} 
                                    rows={5}
                                    placeholder="Enter your content here..."
                                  />
                                  <div className="flex justify-end mt-3">
                                    <Button variant="outline" size="sm">
                                      Format Text
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {block.type === "video" && (
                                <div className="space-y-3">
                                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                                    <Video className="h-12 w-12 text-gray-400" />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="text-sm font-medium mb-1 block">Video URL</label>
                                      <Input defaultValue={block.url} placeholder="Enter video URL" />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium mb-1 block">Duration</label>
                                      <Input defaultValue={block.duration} placeholder="e.g. 10:30" />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium mb-1 block">Description</label>
                                    <Textarea 
                                      rows={3}
                                      placeholder="Add a description for this video"
                                      defaultValue="This introductory video covers the basics of the course and explains the key concepts you'll learn."
                                    />
                                  </div>
                                </div>
                              )}
                              
                              {block.type === "quiz" && (
                                <div className="space-y-3">
                                  <QuizQuestion
                                    question="What is the primary benefit of structured learning paths?"
                                    options={[
                                      "They require less time to complete",
                                      "They provide a guided sequence toward mastering skills",
                                      "They are always created by experts",
                                      "They eliminate the need for assessments"
                                    ]}
                                    correctAnswer={1}
                                    explanation="Structured learning paths provide learners with a clear, guided sequence of courses that leads toward mastering specific skills or achieving certifications."
                                    onAnswer={() => {}}
                                  />
                                  <div className="flex justify-between mt-4">
                                    <Button variant="outline" size="sm">
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add Question
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Edit Quiz Settings
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Content Block
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Assessments Tab */}
          <TabsContent value="assessments" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600 mb-2">
                      Choose from different assessment methods to evaluate learner progress.
                    </p>
                    
                    {[
                      { type: "quiz", icon: <MessageSquare className="h-4 w-4 mr-2" />, name: "Multiple Choice Quiz" },
                      { type: "assignment", icon: <Pen className="h-4 w-4 mr-2" />, name: "Written Assignment" },
                      { type: "project", icon: <FolderOpen className="h-4 w-4 mr-2" />, name: "Project Submission" },
                      { type: "peer", icon: <Users className="h-4 w-4 mr-2" />, name: "Peer Review" },
                      { type: "final", icon: <GraduationCap className="h-4 w-4 mr-2" />, name: "Final Exam" },
                    ].map((assessment) => (
                      <Button 
                        key={assessment.type} 
                        variant="outline" 
                        className="w-full justify-start text-left mb-1"
                      >
                        {assessment.icon}
                        {assessment.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="time-limit" />
                        <Label htmlFor="time-limit">Time Limit</Label>
                      </div>
                      <Input type="number" placeholder="Minutes" className="w-20" defaultValue="30" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="passing-score" defaultChecked />
                        <Label htmlFor="passing-score">Passing Score</Label>
                      </div>
                      <div className="flex items-center">
                        <Input type="number" placeholder="%" className="w-16" defaultValue="70" />
                        <span className="ml-1">%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="randomize" defaultChecked />
                        <Label htmlFor="randomize">Randomize Questions</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="feedback" defaultChecked />
                        <Label htmlFor="feedback">Immediate Feedback</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="retake" />
                        <Label htmlFor="retake">Allow Retakes</Label>
                      </div>
                      <Input type="number" placeholder="Max attempts" className="w-24" defaultValue="3" />
                    </div>
                    
                    <Button className="w-full mt-2">
                      Apply Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Course Assessments</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Assessment
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="quizzes">
                      <TabsList className="grid w-full grid-cols-4 mb-4">
                        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                        <TabsTrigger value="assignments">Assignments</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="exams">Exams</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="quizzes">
                        <div className="space-y-3">
                          {[
                            { id: 1, title: "Module 1 Quiz", questions: 10, passing: "70%", module: "Introduction to the Course" },
                            { id: 2, title: "Core Concepts Quiz", questions: 15, passing: "75%", module: "Core Concepts" },
                            { id: 3, title: "Advanced Techniques Quiz", questions: 12, passing: "80%", module: "Advanced Techniques" },
                          ].map((quiz) => (
                            <div key={quiz.id} className="border rounded-md p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{quiz.title}</h3>
                                  <p className="text-sm text-gray-600">Module: {quiz.module}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge>{quiz.questions} questions</Badge>
                                  <Badge variant="outline">Pass: {quiz.passing}</Badge>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2 mt-3">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Copy className="h-4 w-4 mr-1" />
                                  Duplicate
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <Trash className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="assignments">
                        <div className="space-y-3">
                          {[
                            { id: 1, title: "Data Analysis Report", type: "Written", deadline: "2 weeks after lesson", module: "Core Concepts" },
                          ].map((assignment) => (
                            <div key={assignment.id} className="border rounded-md p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{assignment.title}</h3>
                                  <p className="text-sm text-gray-600">Module: {assignment.module}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge>{assignment.type}</Badge>
                                  <Badge variant="outline">Due: {assignment.deadline}</Badge>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2 mt-3">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <Trash className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          <div className="border border-dashed rounded-md p-6 text-center">
                            <p className="text-gray-500 mb-3">No more assignments added yet</p>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Assignment
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="projects">
                        <div className="border border-dashed rounded-md p-8 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Compass className="h-12 w-12 text-gray-300" />
                            <h3 className="font-medium text-gray-700">No Projects Yet</h3>
                            <p className="text-sm text-gray-500 max-w-md mx-auto">
                              Projects allow learners to apply their knowledge to real-world scenarios.
                              Add a project assessment to your course.
                            </p>
                            <Button className="mt-2">
                              <Plus className="h-4 w-4 mr-1" />
                              Create Project
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="exams">
                        <div className="space-y-3">
                          {[
                            { id: 1, title: "Final Comprehensive Exam", questions: 30, duration: "90 minutes", passing: "75%" },
                          ].map((exam) => (
                            <div key={exam.id} className="border rounded-md p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{exam.title}</h3>
                                  <p className="text-sm text-gray-600">
                                    {exam.questions} questions • {exam.duration}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge>Final Exam</Badge>
                                  <Badge variant="outline">Pass: {exam.passing}</Badge>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2 mt-3">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <Trash className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                {activeTab === "assessments" && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Quiz Builder</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">Quiz Title</label>
                        <Input defaultValue="Module 1 Quiz" />
                      </div>
                      
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">Instructions</label>
                        <Textarea 
                          defaultValue="Answer all questions to the best of your ability. You need 70% to pass. You may retake this quiz up to 3 times." 
                          rows={2}
                        />
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="space-y-6">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium">Question 1</h3>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Question</label>
                              <Textarea 
                                defaultValue="What is the primary benefit of structured learning paths?" 
                                rows={2}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">Answer Options</label>
                              <div className="space-y-2">
                                {[
                                  "They require less time to complete",
                                  "They provide a guided sequence toward mastering skills",
                                  "They are always created by experts",
                                  "They eliminate the need for assessments"
                                ].map((option, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <div className="flex items-center h-10 px-3 border rounded-md flex-grow">
                                      <input 
                                        type="radio" 
                                        name="correct-answer" 
                                        id={`option-${index}`} 
                                        defaultChecked={index === 1} 
                                        className="mr-2"
                                      />
                                      <Input 
                                        defaultValue={option} 
                                        className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                      />
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                
                                <Button variant="outline" size="sm" className="w-full">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Option
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">Explanation (Optional)</label>
                              <Textarea 
                                defaultValue="Structured learning paths provide learners with a clear, guided sequence of courses that leads toward mastering specific skills or achieving certifications." 
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-1" />
                          Add New Question
                        </Button>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Quiz</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Course Visibility</h3>
                        <p className="text-sm text-gray-600">Control who can view and enroll in your course</p>
                      </div>
                      <Select defaultValue="published">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Enrollment Options</h3>
                        <p className="text-sm text-gray-600">Define how learners can join your course</p>
                      </div>
                      <Select defaultValue="open">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Enrollment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open to All</SelectItem>
                          <SelectItem value="approval">Requires Approval</SelectItem>
                          <SelectItem value="invite">Invite Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Course Price</h3>
                        <p className="text-sm text-gray-600">Set pricing for your course</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="free">
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Price Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="subscription">Subscription</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Amount" className="w-24" defaultValue="0" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Completion Certificate</h3>
                        <p className="text-sm text-gray-600">Issue certificates upon course completion</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Discussion Forum</h3>
                        <p className="text-sm text-gray-600">Enable community discussions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Course Language</h3>
                        <p className="text-sm text-gray-600">Primary language for course content</p>
                      </div>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Access & Scheduling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Release Schedule</h3>
                        <p className="text-sm text-gray-600">Control how content is released</p>
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Release Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All at Once</SelectItem>
                          <SelectItem value="sequential">Sequential</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Course Start Date</h3>
                        <p className="text-sm text-gray-600">When will the course begin</p>
                      </div>
                      <Input type="date" className="w-40" defaultValue="2023-08-15" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Course End Date</h3>
                        <p className="text-sm text-gray-600">When will the course end (optional)</p>
                      </div>
                      <Input type="date" className="w-40" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Enrollment Deadline</h3>
                        <p className="text-sm text-gray-600">Last date to enroll (optional)</p>
                      </div>
                      <Input type="date" className="w-40" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Content Access Period</h3>
                        <p className="text-sm text-gray-600">How long learners can access content</p>
                      </div>
                      <Select defaultValue="unlimited">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Access Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="60days">60 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Prerequisite Courses</h3>
                        <p className="text-sm text-gray-600">Courses that must be completed first</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Prerequisite
                      </Button>
                    </div>
                    
                    <div className="pl-4 border-l-2 border-gray-200">
                      <div className="rounded-md bg-gray-50 p-3 flex justify-between items-center">
                        <span>Introduction to Python Programming</span>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Learning Analytics</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="track-progress" defaultChecked />
                          <Label htmlFor="track-progress">Track Progress</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="track-completion" defaultChecked />
                          <Label htmlFor="track-completion">Track Completion</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="track-engagement" defaultChecked />
                          <Label htmlFor="track-engagement">Track Engagement</Label>
                        </div>
                      </div>
                      
                      <h3 className="font-medium mt-6">Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-enrollment" defaultChecked />
                          <Label htmlFor="notify-enrollment">New Enrollments</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-completion" defaultChecked />
                          <Label htmlFor="notify-completion">Course Completions</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-discussion" />
                          <Label htmlFor="notify-discussion">Discussion Posts</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Content Behavior</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="sequential-progression" defaultChecked />
                          <Label htmlFor="sequential-progression">
                            <div>
                              <span>Sequential Progression</span>
                              <p className="text-xs text-gray-600">Require completing content in order</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="completion-requirement" defaultChecked />
                          <Label htmlFor="completion-requirement">
                            <div>
                              <span>Completion Requirements</span>
                              <p className="text-xs text-gray-600">Define what constitutes completion</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="auto-save" defaultChecked />
                          <Label htmlFor="auto-save">
                            <div>
                              <span>Auto-save Progress</span>
                              <p className="text-xs text-gray-600">Save learner progress automatically</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="reminders" />
                          <Label htmlFor="reminders">
                            <div>
                              <span>Learning Reminders</span>
                              <p className="text-xs text-gray-600">Send inactivity reminders</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Helper component
function FolderOpen(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function GraduationCap(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
