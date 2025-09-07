"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Train,
  AlertTriangle,
  Activity,
  TrendingUp,
  MapPin,
  Zap,
  CheckCircle,
  Play,
  Pause,
  Clock,
  Users,
  Fuel,
  Settings,
  Shield,
  Wifi,
  Database,
  Brain,
  Route,
  Timer,
  Target,
  Gauge,
  Bell,
  Search,
  Map,
  Maximize2,
  RefreshCw,
  Download,
  Upload,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Satellite,
  Navigation,
  TrendingDown,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react"

const mockTrains = [
  {
    id: "12951",
    name: "Mumbai Rajdhani",
    type: "Express",
    priority: "High",
    status: "On Time",
    delay: 0,
    location: "Approaching Borivali",
    nextStation: "Borivali",
    speed: 95,
    capacity: 1200,
    occupancy: 89,
    fuelLevel: 78,
    driver: "Rajesh Kumar",
    eta: "14:25",
    platform: "2",
    coaches: 18,
    gpsLat: 19.2307,
    gpsLng: 72.8567,
    lastUpdate: "2 sec ago",
    temperature: 24,
    engineHealth: 98,
    brakeStatus: "Normal",
    signalAspect: "Green",
    passengerLoad: "Heavy",
    ticketRevenue: "₹2,45,680",
    distanceToNext: 2.3,
    estimatedArrival: "14:25:30",
  },
  {
    id: "12009",
    name: "Shatabdi Express",
    type: "Express",
    priority: "High",
    status: "Delayed",
    delay: 12,
    location: "Andheri Junction",
    nextStation: "Bandra",
    speed: 0,
    capacity: 1050,
    occupancy: 92,
    fuelLevel: 65,
    driver: "Amit Sharma",
    eta: "14:42",
    platform: "1",
    coaches: 16,
    gpsLat: 19.1197,
    gpsLng: 72.8464,
    lastUpdate: "1 sec ago",
    temperature: 26,
    engineHealth: 95,
    brakeStatus: "Applied",
    signalAspect: "Red",
    passengerLoad: "Full",
    ticketRevenue: "₹1,98,450",
    distanceToNext: 0.0,
    estimatedArrival: "14:42:15",
  },
  {
    id: "50103",
    name: "Freight Express",
    type: "Freight",
    priority: "Medium",
    status: "On Time",
    delay: 0,
    location: "Malad Yard",
    nextStation: "Kandivali",
    speed: 45,
    capacity: 2500,
    occupancy: 85,
    fuelLevel: 82,
    driver: "Suresh Patil",
    eta: "15:10",
    platform: "Goods",
    coaches: 24,
    gpsLat: 19.1868,
    gpsLng: 72.8493,
    lastUpdate: "3 sec ago",
    temperature: 22,
    engineHealth: 97,
    brakeStatus: "Normal",
    signalAspect: "Yellow",
    passengerLoad: "N/A",
    ticketRevenue: "₹45,200",
    distanceToNext: 4.7,
    estimatedArrival: "15:10:45",
  },
  {
    id: "90401",
    name: "Local Passenger",
    type: "Local",
    priority: "Low",
    status: "Early",
    delay: -3,
    location: "Goregaon",
    nextStation: "Malad",
    speed: 65,
    capacity: 1800,
    occupancy: 78,
    fuelLevel: 71,
    driver: "Prakash Joshi",
    eta: "14:18",
    platform: "3",
    coaches: 12,
    gpsLat: 19.1626,
    gpsLng: 72.8506,
    lastUpdate: "1 sec ago",
    temperature: 25,
    engineHealth: 94,
    brakeStatus: "Normal",
    signalAspect: "Green",
    passengerLoad: "Moderate",
    ticketRevenue: "₹12,340",
    distanceToNext: 1.8,
    estimatedArrival: "14:18:20",
  },
]

const mockConflicts = [
  {
    id: 1,
    type: "Platform Conflict",
    trains: ["12951", "12009"],
    section: "Borivali Junction",
    severity: "Critical",
    eta: "14:30",
    description: "Both trains scheduled for Platform 2 simultaneously",
    aiConfidence: 96,
    recommendation:
      "Redirect 12009 to Platform 1, delay by 4 minutes. Optimal solution maintains overall schedule integrity.",
    impact: { delay: 4, throughput: -2, passengers: 1050, cost: "₹15,600" },
    alternatives: 3,
    riskLevel: "High",
    autoResolvable: true,
    timeToResolve: "2 min",
    affectedServices: ["12951", "12009", "90402"],
    weatherImpact: "None",
    passengerImpact: "Moderate",
    economicImpact: "Low",
  },
  {
    id: 2,
    type: "Speed Restriction",
    trains: ["50103"],
    section: "Malad-Kandivali",
    severity: "Medium",
    eta: "15:15",
    description: "Track maintenance requires 40 km/h speed limit",
    aiConfidence: 89,
    recommendation: "Maintain current schedule. 8-minute delay acceptable within freight tolerance.",
    impact: { delay: 8, throughput: -5, passengers: 0, cost: "₹8,200" },
    alternatives: 2,
    riskLevel: "Medium",
    autoResolvable: false,
    timeToResolve: "45 min",
    affectedServices: ["50103"],
    weatherImpact: "None",
    passengerImpact: "None",
    economicImpact: "Low",
  },
  {
    id: 3,
    type: "Signal Failure",
    trains: ["90401", "12951"],
    section: "Goregaon-Malad",
    severity: "High",
    eta: "14:20",
    description: "Automatic signal system offline, manual control required",
    aiConfidence: 92,
    recommendation: "Implement 5-minute safety buffer between trains. Switch to manual signaling protocol.",
    impact: { delay: 5, throughput: -8, passengers: 2250, cost: "₹32,400" },
    alternatives: 1,
    riskLevel: "High",
    autoResolvable: false,
    timeToResolve: "15 min",
    affectedServices: ["90401", "12951", "90403"],
    weatherImpact: "None",
    passengerImpact: "High",
    economicImpact: "Medium",
  },
]

const mockMetrics = {
  sectionThroughput: 87,
  averageDelay: 6.2,
  onTimePerformance: 94,
  fuelEfficiency: 18.7,
  passengerSatisfaction: 4.2,
  safetyScore: 99.8,
  energyConsumption: 245,
  carbonFootprint: 12.3,
  totalRevenue: "₹4,56,780",
  operationalCost: "₹2,34,560",
  profitMargin: 48.6,
  networkUtilization: 78.4,
  maintenanceScore: 96.2,
  weatherImpact: 2.1,
  passengerComplaints: 3,
  systemUptime: 99.97,
}

const systemStatus = {
  aiEngine: { status: "Optimal", uptime: 99.97, lastUpdate: "2 sec ago", load: 67 },
  dataProcessing: { status: "Active", throughput: "2.4M/sec", latency: "12ms", queueSize: 245 },
  connectivity: { status: "Strong", signalStrength: 98, lostPackets: 0.02, bandwidth: "1.2 Gbps" },
  database: { status: "Healthy", queries: 1247, responseTime: "8ms", connections: 45 },
  gpsTracking: { status: "Active", satellites: 12, accuracy: "±2m", lastSync: "1 sec ago" },
  weatherSystem: { status: "Online", sources: 5, lastUpdate: "5 min ago", alerts: 0 },
}

const mockNotifications = [
  {
    id: 1,
    type: "critical",
    message: "Platform conflict detected at Borivali Junction",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    message: "Track maintenance scheduled for tomorrow 02:00",
    time: "15 min ago",
    read: false,
  },
  { id: 3, type: "info", message: "AI optimization improved throughput by 12%", time: "1 hour ago", read: true },
  { id: 4, type: "success", message: "All trains on schedule for the past 2 hours", time: "2 hours ago", read: true },
]

export default function RailMindDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [optimizationActive, setOptimizationActive] = useState(true)
  const [autoResolve, setAutoResolve] = useState(false)
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null)
  const [systemLoad, setSystemLoad] = useState(67)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showMap, setShowMap] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setSystemLoad((prev) => Math.max(45, Math.min(95, prev + (Math.random() - 0.5) * 10)))

      // Simulate real-time train updates
      mockTrains.forEach((train) => {
        if (train.speed > 0) {
          train.gpsLat += (Math.random() - 0.5) * 0.001
          train.gpsLng += (Math.random() - 0.5) * 0.001
          train.distanceToNext = Math.max(0, train.distanceToNext - 0.1)
        }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredTrains = mockTrains.filter((train) => {
    const matchesSearch =
      train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.id.includes(searchQuery) ||
      train.driver.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "delayed" && train.delay > 0) ||
      (filterStatus === "ontime" && train.delay === 0) ||
      (filterStatus === "early" && train.delay < 0)
    return matchesSearch && matchesFilter
  })

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  const markNotificationRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time":
        return "text-green-600 font-medium"
      case "Delayed":
        return "text-red-600 font-medium"
      case "Early":
        return "text-blue-600 font-medium"
      default:
        return "text-gray-600"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "border-red-500 bg-red-50"
      case "High":
        return "border-orange-500 bg-orange-50"
      case "Medium":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getSignalColor = (aspect: string) => {
    switch (aspect) {
      case "Green":
        return "bg-green-500"
      case "Yellow":
        return "bg-yellow-500"
      case "Red":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <div className={`min-h-screen bg-slate-50 ${isFullscreen ? "p-2" : "p-6"}`}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Train className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">RailMind Control Center</h1>
                <p className="text-slate-600">AI-Powered Section Traffic Optimization • Mumbai Central Division</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
                className="h-8 px-2"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
                className="h-8 px-2"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-right space-y-1">
              <div className="text-2xl font-mono font-bold text-slate-900">{currentTime.toLocaleTimeString()}</div>
              <div className="text-sm text-slate-600">Controller: Priya Mehta • Shift: Day (06:00-18:00)</div>
              <div className="flex items-center gap-2 justify-end">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-500">System Load: {systemLoad}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${optimizationActive ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                  ></div>
                  <span className="text-sm font-medium">AI Engine: {optimizationActive ? "Active" : "Standby"}</span>
                  <Badge variant="outline" className="text-xs">
                    v2.1.4
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Processing: {systemStatus.dataProcessing.throughput}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Signal: {systemStatus.connectivity.signalStrength}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">GPS: {systemStatus.gpsTracking.satellites} sats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Safety Score: {mockMetrics.safetyScore}%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                  {refreshing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Refresh
                </Button>
                <Button
                  variant={simulationRunning ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setSimulationRunning(!simulationRunning)}
                >
                  {simulationRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {simulationRunning ? "Stop Simulation" : "Run Simulation"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setOptimizationActive(!optimizationActive)}>
                  <Brain className="w-4 h-4 mr-2" />
                  AI {optimizationActive ? "ON" : "OFF"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
                  {soundEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                  Sound
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {isFullscreen ? "Exit" : "Fullscreen"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Gauge className="w-3 h-3" />
              Throughput
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-slate-900">{mockMetrics.sectionThroughput}%</div>
            <Progress value={mockMetrics.sectionThroughput} className="mt-1 h-1" />
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />↑ 12% vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Avg Delay
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-slate-900">{mockMetrics.averageDelay}m</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />↓ 25% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Target className="w-3 h-3" />
              On-Time
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-slate-900">{mockMetrics.onTimePerformance}%</div>
            <Progress value={mockMetrics.onTimePerformance} className="mt-1 h-1" />
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />↑ 8% this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Fuel className="w-3 h-3" />
              Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-slate-900">{mockMetrics.fuelEfficiency}%</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />↑ 15% savings
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-slate-900">{mockMetrics.passengerSatisfaction}/5</div>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= Math.floor(mockMetrics.passengerSatisfaction) ? "bg-yellow-400" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <p className="text-xs text-green-600 mt-1">↑ 0.3 rating</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-slate-900">{mockMetrics.safetyScore}%</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Perfect record
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg font-bold text-slate-900">{mockMetrics.totalRevenue}</div>
            <p className="text-xs text-slate-500 mt-1">Today's earnings</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Profit
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-slate-900">{mockMetrics.profitMargin}%</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />↑ 5.2% margin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="live-control" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200">
          <TabsTrigger
            value="live-control"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            Live Control
          </TabsTrigger>
          <TabsTrigger value="conflicts" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">
            Conflicts ({mockConflicts.length})
          </TabsTrigger>
          <TabsTrigger
            value="simulation"
            className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
          >
            Simulation
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-gray-50 data-[state=active]:text-gray-700">
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live-control" className="space-y-6">
          {mockConflicts.filter((c) => c.severity === "Critical").length > 0 && (
            <Alert className="border-red-200 bg-red-50 animate-pulse">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 flex items-center gap-2">
                Critical Conflicts Detected
                <Badge variant="destructive" className="animate-bounce">
                  URGENT
                </Badge>
              </AlertTitle>
              <AlertDescription className="text-red-700">
                {mockConflicts.filter((c) => c.severity === "Critical").length} critical scheduling conflicts require
                immediate attention. AI recommendations available with {mockConflicts[0]?.aiConfidence}% confidence.
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="destructive">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Auto-Resolve
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2 border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-blue-600" />
                    Active Trains ({filteredTrains.length})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-2 top-2.5 text-slate-400" />
                        <Input
                          placeholder="Search trains..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8 w-40"
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md text-sm bg-white"
                      >
                        <option value="all">All Status</option>
                        <option value="ontime">On Time</option>
                        <option value="delayed">Delayed</option>
                        <option value="early">Early</option>
                      </select>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowMap(!showMap)}>
                      <Map className="w-4 h-4 mr-2" />
                      {showMap ? "List" : "Map"}
                    </Button>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="auto-resolve" className="text-sm">
                        Auto-resolve
                      </Label>
                      <Switch id="auto-resolve" checked={autoResolve} onCheckedChange={setAutoResolve} />
                    </div>
                  </div>
                </div>
                <CardDescription>Real-time train positions, status, and operational metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredTrains.map((train) => (
                    <div
                      key={train.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedTrain === train.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => setSelectedTrain(selectedTrain === train.id ? null : train.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900">{train.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {train.type}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${getSignalColor(train.signalAspect)}`}></div>
                                <span className="text-xs text-slate-500">{train.signalAspect}</span>
                              </div>
                            </div>
                            <span className="text-sm text-slate-600">
                              #{train.id} • Driver: {train.driver} • Updated: {train.lastUpdate}
                            </span>
                          </div>
                          <Badge className={getPriorityColor(train.priority)}>{train.priority}</Badge>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${getStatusColor(train.status)}`}>{train.status}</div>
                          <div className="text-sm text-slate-600">
                            ETA: {train.estimatedArrival} • Platform {train.platform}
                          </div>
                          <div className="text-xs text-slate-500">
                            GPS: {train.gpsLat.toFixed(4)}, {train.gpsLng.toFixed(4)}
                          </div>
                        </div>
                      </div>

                      {selectedTrain === train.id && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-slate-500">Speed:</span>
                              <div className="font-medium flex items-center gap-1">
                                {train.speed} km/h
                                {train.speed > 0 && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-500">Occupancy:</span>
                              <div className="font-medium">
                                {train.occupancy}% ({Math.round((train.capacity * train.occupancy) / 100)})
                              </div>
                              <Progress value={train.occupancy} className="h-1 mt-1" />
                            </div>
                            <div>
                              <span className="text-slate-500">Fuel Level:</span>
                              <div className="font-medium flex items-center gap-2">
                                {train.fuelLevel}%
                                <Progress value={train.fuelLevel} className="h-1 flex-1" />
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-500">Engine Health:</span>
                              <div className="font-medium text-green-600">{train.engineHealth}%</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-slate-500">Temperature:</span>
                              <div className="font-medium">{train.temperature}°C</div>
                            </div>
                            <div>
                              <span className="text-slate-500">Brake Status:</span>
                              <div
                                className={`font-medium ${train.brakeStatus === "Normal" ? "text-green-600" : "text-yellow-600"}`}
                              >
                                {train.brakeStatus}
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-500">Distance to Next:</span>
                              <div className="font-medium">{train.distanceToNext.toFixed(1)} km</div>
                            </div>
                            <div>
                              <span className="text-slate-500">Revenue:</span>
                              <div className="font-medium text-green-600">{train.ticketRevenue}</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Navigation className="w-4 h-4 mr-2" />
                              Track on Map
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Send Alert
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {train.location} → {train.nextStation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {train.delay !== 0 && (
                            <Badge variant={train.delay > 0 ? "destructive" : "secondary"}>
                              {train.delay > 0 ? "+" : ""}
                              {train.delay} min
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {train.passengerLoad}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-green-600" />
                  Section Status
                </CardTitle>
                <CardDescription>Real-time section utilization and capacity management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mumbai Central - Mahalaxmi",
                      utilization: 92,
                      trains: 3,
                      status: "High Traffic",
                      incidents: 1,
                      avgSpeed: 45,
                    },
                    {
                      name: "Mahalaxmi - Lower Parel",
                      utilization: 78,
                      trains: 2,
                      status: "Normal",
                      incidents: 0,
                      avgSpeed: 65,
                    },
                    {
                      name: "Lower Parel - Prabhadevi",
                      utilization: 85,
                      trains: 2,
                      status: "Moderate",
                      incidents: 0,
                      avgSpeed: 58,
                    },
                    {
                      name: "Prabhadevi - Dadar",
                      utilization: 67,
                      trains: 1,
                      status: "Light Traffic",
                      incidents: 0,
                      avgSpeed: 72,
                    },
                    {
                      name: "Dadar - Matunga",
                      utilization: 45,
                      trains: 1,
                      status: "Clear",
                      incidents: 0,
                      avgSpeed: 85,
                    },
                  ].map((section, index) => (
                    <div
                      key={section.name}
                      className="space-y-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-slate-900">{section.name}</span>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            {section.trains} active trains • Avg speed: {section.avgSpeed} km/h
                            {section.incidents > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {section.incidents} incident
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            section.utilization > 85
                              ? "border-red-200 text-red-700 bg-red-50"
                              : section.utilization > 70
                                ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                                : "border-green-200 text-green-700 bg-green-50"
                          }`}
                        >
                          {section.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={section.utilization}
                          className={`flex-1 h-2 ${
                            section.utilization > 85
                              ? "[&>div]:bg-red-500"
                              : section.utilization > 70
                                ? "[&>div]:bg-yellow-500"
                                : "[&>div]:bg-green-500"
                          }`}
                        />
                        <span className="text-sm font-medium text-slate-700 w-12">{section.utilization}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Active Conflicts & AI Recommendations
                  </CardTitle>
                  <CardDescription>Automated conflict detection with multi-objective optimization</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="alerts" className="text-sm">
                    Sound Alerts
                  </Label>
                  <Switch id="alerts" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockConflicts.map((conflict) => (
                  <div
                    key={conflict.id}
                    className={`border rounded-lg p-5 ${getSeverityColor(conflict.severity)} hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-slate-900">{conflict.type}</h4>
                          <Badge
                            variant={
                              conflict.severity === "Critical"
                                ? "destructive"
                                : conflict.severity === "High"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {conflict.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            AI Confidence: {conflict.aiConfidence}%
                          </Badge>
                          {conflict.autoResolvable && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              Auto-Resolvable
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{conflict.description}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span>Trains: {conflict.trains.join(", ")}</span>
                          <span>•</span>
                          <span>Location: {conflict.section}</span>
                          <span>•</span>
                          <span>ETA: {conflict.eta}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Risk Level: {conflict.riskLevel}</span>
                          <span>•</span>
                          <span>Resolution Time: {conflict.timeToResolve}</span>
                          <span>•</span>
                          <span>Affected Services: {conflict.affectedServices.length}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Timer className="w-5 h-5 text-slate-400 mb-1" />
                        <div className="text-sm font-medium">T-{Math.floor(Math.random() * 15 + 5)}m</div>
                      </div>
                    </div>

                    <div className="bg-white/80 p-4 rounded-md mb-4">
                      <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-blue-600" />
                        AI Optimization Recommendation
                      </h5>
                      <p className="text-sm text-slate-700 mb-3">{conflict.recommendation}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-2 bg-slate-50 rounded">
                          <div className="font-medium text-slate-900">{conflict.impact.delay}m</div>
                          <div className="text-xs text-slate-600">Added Delay</div>
                        </div>
                        <div className="text-center p-2 bg-slate-50 rounded">
                          <div className="font-medium text-slate-900">{conflict.impact.throughput}%</div>
                          <div className="text-xs text-slate-600">Throughput Impact</div>
                        </div>
                        <div className="text-center p-2 bg-slate-50 rounded">
                          <div className="font-medium text-slate-900">{conflict.impact.passengers}</div>
                          <div className="text-xs text-slate-600">Affected Passengers</div>
                        </div>
                        <div className="text-center p-2 bg-slate-50 rounded">
                          <div className="font-medium text-slate-900">{conflict.impact.cost}</div>
                          <div className="text-xs text-slate-600">Economic Impact</div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-slate-500">Passenger Impact:</span>
                            <div
                              className={`font-medium ${conflict.passengerImpact === "High" ? "text-red-600" : conflict.passengerImpact === "Moderate" ? "text-yellow-600" : "text-green-600"}`}
                            >
                              {conflict.passengerImpact}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500">Economic Impact:</span>
                            <div
                              className={`font-medium ${conflict.economicImpact === "High" ? "text-red-600" : conflict.economicImpact === "Medium" ? "text-yellow-600" : "text-green-600"}`}
                            >
                              {conflict.economicImpact}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500">Weather Factor:</span>
                            <div className="font-medium text-slate-600">{conflict.weatherImpact}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Accept ({conflict.aiConfidence}%)
                        </Button>
                        <Button variant="outline" size="sm">
                          Manual Override
                        </Button>
                        <Button variant="ghost" size="sm">
                          View {conflict.alternatives} Alternatives
                        </Button>
                        {conflict.autoResolvable && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 bg-transparent"
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Auto-Resolve
                          </Button>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Simulate Impact →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ... existing simulation, analytics, and system tabs ... */}

        <TabsContent value="simulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                What-If Simulation Environment
              </CardTitle>
              <CardDescription>Test scheduling scenarios without affecting live operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scenario Type</label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Emergency Brake Failure</option>
                      <option>Signal System Maintenance</option>
                      <option>Weather Delay (Heavy Rain)</option>
                      <option>Peak Hour Rush</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Affected Section</label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Section B-C</option>
                      <option>Section A-B</option>
                      <option>Section C-D</option>
                      <option>All Sections</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Run Simulation</Button>
                  <Button variant="outline">Load Saved Scenario</Button>
                  <Button variant="ghost">Reset Parameters</Button>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Simulation Results Preview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Throughput Impact:</span>
                      <div className="font-medium text-destructive">-23%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Average Delay:</span>
                      <div className="font-medium text-destructive">+18 min</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Affected Trains:</span>
                      <div className="font-medium">7 trains</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Recovery Time:</span>
                      <div className="font-medium">45 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Section Throughput (7 days)</span>
                    <span className="text-sm font-medium text-green-600">↑ 15%</span>
                  </div>
                  <Progress value={88} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Delay Reduction (7 days)</span>
                    <span className="text-sm font-medium text-green-600">↓ 32%</span>
                  </div>
                  <Progress value={68} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fuel Efficiency (7 days)</span>
                    <span className="text-sm font-medium text-green-600">↑ 18%</span>
                  </div>
                  <Progress value={82} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Prediction Accuracy</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Optimization Success Rate</span>
                    <span className="text-sm font-medium">89.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">1.2s avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Model Confidence</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(systemStatus).map(([key, status]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                          <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                          <div className="text-sm text-slate-600">{status.status}</div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">
                          {"uptime" in status && `${status.uptime}%`}
                          {"throughput" in status && status.throughput}
                          {"signalStrength" in status && `${status.signalStrength}%`}
                          {"queries" in status && `${status.queries} ops/s`}
                          {"satellites" in status && `${status.satellites} sats`}
                          {"sources" in status && `${status.sources} sources`}
                        </div>
                        <div className="text-slate-500">
                          {"lastUpdate" in status && status.lastUpdate}
                          {"latency" in status && status.latency}
                          {"lostPackets" in status && `${status.lostPackets}% loss`}
                          {"responseTime" in status && status.responseTime}
                          {"accuracy" in status && status.accuracy}
                          {"lastSync" in status && status.lastSync}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-600" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="optimization-level">AI Optimization Level</Label>
                    <select id="optimization-level" className="w-full p-2 border border-slate-300 rounded-md bg-white">
                      <option>Conservative</option>
                      <option selected>Balanced</option>
                      <option>Aggressive</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="update-frequency">Data Update Frequency</Label>
                    <select id="update-frequency" className="w-full p-2 border border-slate-300 rounded-md bg-white">
                      <option>1 second</option>
                      <option selected>2 seconds</option>
                      <option>5 seconds</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alert-threshold">Alert Threshold</Label>
                    <Input id="alert-threshold" type="number" defaultValue="85" className="w-full" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="predictive-mode">Predictive Mode</Label>
                    <Switch id="predictive-mode" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-backup">Auto Backup</Label>
                    <Switch id="auto-backup" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="gps-tracking">GPS Tracking</Label>
                    <Switch id="gps-tracking" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="weather-integration">Weather Integration</Label>
                    <Switch id="weather-integration" defaultChecked />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Config
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Import Config
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
