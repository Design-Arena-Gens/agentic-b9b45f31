'use client'

import { useState, useEffect } from 'react'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Laptop,
  Smartphone,
  Activity,
  Ticket,
  Users,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data
const vulnerabilityData = [
  { name: 'Jan', critical: 12, high: 24, medium: 45, low: 78 },
  { name: 'Feb', critical: 8, high: 19, medium: 38, low: 65 },
  { name: 'Mar', critical: 5, high: 15, medium: 32, low: 58 },
  { name: 'Apr', critical: 3, high: 12, medium: 28, low: 52 },
]

const ticketStatusData = [
  { name: 'Open', value: 45, color: '#ef4444' },
  { name: 'In Progress', value: 28, color: '#f59e0b' },
  { name: 'Resolved', value: 156, color: '#10b981' },
  { name: 'Closed', value: 203, color: '#6b7280' },
]

const endpointHealthData = [
  { device: 'Windows Workstations', total: 245, healthy: 230, warning: 10, critical: 5 },
  { device: 'macOS Devices', total: 89, healthy: 85, warning: 3, critical: 1 },
  { device: 'Mobile Devices', total: 156, healthy: 148, warning: 6, critical: 2 },
  { device: 'Network Devices', total: 42, healthy: 38, warning: 3, critical: 1 },
]

const recentTickets = [
  { id: 'INC-2045', title: 'VPN Connection Issues', priority: 'High', status: 'In Progress', assignee: 'John Smith', created: '2h ago' },
  { id: 'INC-2044', title: 'Password Reset Request', priority: 'Medium', status: 'Open', assignee: 'Sarah Lee', created: '3h ago' },
  { id: 'INC-2043', title: 'Printer Not Working', priority: 'Low', status: 'Resolved', assignee: 'Mike Johnson', created: '5h ago' },
  { id: 'REQ-1234', title: 'New User Onboarding', priority: 'Medium', status: 'In Progress', assignee: 'John Smith', created: '1d ago' },
  { id: 'INC-2042', title: 'Critical CVE-2024-1234', priority: 'Critical', status: 'Open', assignee: 'Security Team', created: '30m ago' },
]

const vulnerabilityAlerts = [
  { id: 'CVE-2024-1234', severity: 'Critical', affected: 12, description: 'Windows RCE vulnerability affecting domain controllers', remediation: 'Apply KB5034441' },
  { id: 'CVE-2024-5678', severity: 'High', affected: 45, description: 'Chrome browser security update required', remediation: 'Update to v122.0.6261.94' },
  { id: 'CVE-2024-9012', severity: 'Medium', affected: 8, description: 'Adobe Reader PDF parsing vulnerability', remediation: 'Update to latest version' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [chatMessages, setChatMessages] = useState<Array<{role: string, content: string}>>([
    { role: 'assistant', content: 'Hello! I\'m your AI IT Support Assistant. I can help you with:\n\n• Level 1 & 2 technical support\n• Vulnerability assessments\n• Incident management\n• Access requests\n• Software troubleshooting\n• Hardware diagnostics\n\nHow can I assist you today?' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim()
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: chatMessages })
      })

      const data = await response.json()
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IT Operations Center</h1>
                <p className="text-sm text-gray-500">AI-Powered Vulnerability & Support Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  IT
                </div>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="px-6 flex space-x-8">
          {['overview', 'vulnerabilities', 'tickets', 'endpoints', 'ai-assistant'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Critical Vulnerabilities</p>
                    <p className="text-3xl font-bold text-red-600">3</p>
                    <p className="text-xs text-gray-500 mt-1">-40% from last month</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-red-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Open Tickets</p>
                    <p className="text-3xl font-bold text-orange-600">73</p>
                    <p className="text-xs text-gray-500 mt-1">45 new this week</p>
                  </div>
                  <Ticket className="w-12 h-12 text-orange-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Healthy Endpoints</p>
                    <p className="text-3xl font-bold text-green-600">501/532</p>
                    <p className="text-xs text-gray-500 mt-1">94.2% uptime</p>
                  </div>
                  <Activity className="w-12 h-12 text-green-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Resolution Time</p>
                    <p className="text-3xl font-bold text-blue-600">2.3h</p>
                    <p className="text-xs text-gray-500 mt-1">-15% improvement</p>
                  </div>
                  <Clock className="w-12 h-12 text-blue-600 opacity-20" />
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vulnerability Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vulnerabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="high" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} />
                    <Line type="monotone" dataKey="low" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ticketStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ticketStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Tickets */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{ticket.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{ticket.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            ticket.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{ticket.status}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignee}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{ticket.created}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vulnerabilities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Vulnerability Alerts</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4" />
                  <span>Scan Now</span>
                </button>
              </div>

              <div className="space-y-4">
                {vulnerabilityAlerts.map((vuln) => (
                  <div key={vuln.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                            vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {vuln.severity}
                          </span>
                          <span className="font-mono font-semibold text-gray-900">{vuln.id}</span>
                          <span className="text-sm text-gray-500">{vuln.affected} devices affected</span>
                        </div>
                        <p className="text-gray-700 mb-2">{vuln.description}</p>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="font-semibold text-gray-700">Remediation:</span>
                          <span className="text-blue-600">{vuln.remediation}</span>
                        </div>
                      </div>
                      <button className="ml-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                        Create Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint Health Status</h3>
              <div className="space-y-4">
                {endpointHealthData.map((endpoint) => (
                  <div key={endpoint.device} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {endpoint.device.includes('Windows') && <Laptop className="w-5 h-5 text-blue-600" />}
                        {endpoint.device.includes('macOS') && <Laptop className="w-5 h-5 text-gray-600" />}
                        {endpoint.device.includes('Mobile') && <Smartphone className="w-5 h-5 text-green-600" />}
                        {endpoint.device.includes('Network') && <Server className="w-5 h-5 text-purple-600" />}
                        <span className="font-semibold text-gray-900">{endpoint.device}</span>
                      </div>
                      <span className="text-sm text-gray-500">Total: {endpoint.total}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-green-500"
                            style={{ width: `${(endpoint.healthy / endpoint.total) * 100}%` }}
                          ></div>
                          <div
                            className="bg-yellow-500"
                            style={{ width: `${(endpoint.warning / endpoint.total) * 100}%` }}
                          ></div>
                          <div
                            className="bg-red-500"
                            style={{ width: `${(endpoint.critical / endpoint.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600">{endpoint.healthy}</span>
                        <span className="text-yellow-600">{endpoint.warning}</span>
                        <span className="text-red-600">{endpoint.critical}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Ticket Management</h3>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Ticket
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets by ID, title, or assignee..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Critical</span>
                    <span className="text-2xl font-bold text-red-600">5</span>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Pending SLA Breach</span>
                    <span className="text-2xl font-bold text-yellow-600">12</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Resolved Today</span>
                    <span className="text-2xl font-bold text-green-600">28</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SLA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{ticket.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{ticket.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            ticket.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{ticket.status}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignee}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="text-green-600 font-medium">Within SLA</span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'endpoints' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Endpoint Inventory & Health</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Device Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={endpointHealthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="device" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="healthy" stackId="a" fill="#10b981" name="Healthy" />
                      <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Warning" />
                      <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Windows 10/11</span>
                      <span className="text-xl font-bold text-blue-600">245</span>
                    </div>
                    <div className="text-xs text-gray-600">Last patched: 3 days ago</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">macOS Devices</span>
                      <span className="text-xl font-bold text-gray-600">89</span>
                    </div>
                    <div className="text-xs text-gray-600">Last patched: 1 day ago</div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Mobile Devices</span>
                      <span className="text-xl font-bold text-green-600">156</span>
                    </div>
                    <div className="text-xs text-gray-600">MDM enrolled: 154/156</div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Network Devices</span>
                      <span className="text-xl font-bold text-purple-600">42</span>
                    </div>
                    <div className="text-xs text-gray-600">Firmware up to date: 38/42</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Critical Device Alerts</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium text-gray-900">WS-SALES-042</div>
                        <div className="text-sm text-gray-600">Disk usage at 98% - requires immediate attention</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                      Create Ticket
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-gray-900">MAC-DEV-015</div>
                        <div className="text-sm text-gray-600">macOS 12.x detected - upgrade to 14.x required</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                      Create Ticket
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-medium text-gray-900">SWITCH-CORE-01</div>
                        <div className="text-sm text-gray-600">High CPU utilization detected (&gt;85% for 2 hours)</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                      Investigate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col" style={{ height: '70vh' }}>
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">AI Support Assistant</h3>
                <p className="text-sm text-gray-500">Powered by Claude - Level 1 & 2 Technical Support</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl rounded-lg px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe your IT issue or request..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors">
                    Password Reset Request
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors">
                    Software Installation
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors">
                    VPN Troubleshooting
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors">
                    Hardware Diagnostics
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors">
                    Access Request
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors">
                    Vulnerability Assessment
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Integration Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">ServiceNow</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Jira</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Freshservice</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Connected</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-4">AI Capabilities</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Level 1 & 2 Support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Automated Diagnostics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Vulnerability Analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Ticket Auto-Creation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Knowledge Base Search</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
