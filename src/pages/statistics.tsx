import { useState } from 'react';
import { Progress } from "../components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { BadgeAlert, Shield, UserRound, AlertTriangle, TrendingUp, TrendingDown, BarChart2 } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { BarChart } from '@tremor/react';

const Statistics = () => {
  const [activeFilter, setActiveFilter] = useState('monthly');
  const [sortField, setSortField] = useState<keyof typeof tableData[0]>('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const monthlyStats = [
    { 
      title: "Total Reports", 
      value: "1,234", 
      icon: BadgeAlert, 
      change: "+12%", 
      description: "Reported incidents this month",
      progress: 78,
      breakdown: [
        { category: "Verbal Harassment", percentage: 45 },
        { category: "Exclusion", percentage: 25 },
        { category: "Threats", percentage: 15 },
        { category: "Impersonation", percentage: 15 }
      ]
    },
    { 
      title: "Active Cases", 
      value: "89", 
      icon: AlertTriangle, 
      change: "-4%", 
      description: "Currently being investigated",
      progress: 62,
      breakdown: [
        { category: "High Priority", percentage: 35 },
        { category: "Medium Priority", percentage: 40 },
        { category: "Low Priority", percentage: 25 }
      ]
    },
    { 
      title: "Resolved", 
      value: "892", 
      icon: Shield, 
      change: "+24%", 
      description: "Successfully resolved cases",
      progress: 85,
      breakdown: [
        { category: "School Interventions", percentage: 40 },
        { category: "Counseling", percentage: 30 },
        { category: "Direct Support", percentage: 30 }
      ]
    },
    { 
      title: "Affected Users", 
      value: "328", 
      icon: UserRound, 
      change: "+8%", 
      description: "Users requiring support",
      progress: 55,
      breakdown: [
        { category: "Students", percentage: 70 },
        { category: "Teachers", percentage: 15 },
        { category: "Parents", percentage: 15 }
      ]
    }
  ];

  const quarterlyStats = monthlyStats.map(stat => ({
    ...stat,
    value: (parseInt(stat.value.replace(',', '')) * 3).toLocaleString(),
    change: stat.change.startsWith('+') 
      ? `+${(parseFloat(stat.change.slice(1)) * 3).toFixed(0)}%`
      : `-${(parseFloat(stat.change.slice(1)) * 3).toFixed(0)}%`,
    progress: Math.min(stat.progress + 10, 95)
  }));

  const renderStats = activeFilter === 'monthly' ? monthlyStats : quarterlyStats;

  const chartdata = [
    { month: "Jan", Cyberbullying: 45, Harassment: 35 },
    { month: "Feb", Cyberbullying: 52, Harassment: 42 },
    { month: "Mar", Cyberbullying: 48, Harassment: 38 },
    { month: "Apr", Cyberbullying: 61, Harassment: 45 },
    { month: "May", Cyberbullying: 55, Harassment: 41 },
  ];

  const tableData = [
    { id: 1, type: "Cyberbullying", severity: "High", status: "Active", date: "2024-03-15" },
    { id: 2, type: "Harassment", severity: "Medium", status: "Resolved", date: "2024-03-14" },
    { id: 3, type: "Threats", severity: "High", status: "Under Review", date: "2024-03-13" },
  ];

  const sortedTableData = [...tableData].sort((a, b) => {
    const compareA = a[sortField];
    const compareB = b[sortField];

    if (sortDirection === 'asc') {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  const toggleSortDirection = (field: keyof typeof tableData[0]) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <ScrollArea className="h-full p-6 space-y-6">
      <div className="space-y-2 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cyberbullying Statistics</h2>
          <p className="text-muted-foreground">Monitor and analyze cyberbullying incidents</p>
        </div>
        <Tabs 
          defaultValue="monthly" 
          onValueChange={(value) => setActiveFilter(value)}
          className="bg-secondary rounded-lg"
        >
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {renderStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {stat.value}
                {stat.change.startsWith('+') ? (
                  <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="ml-2 h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Progress value={stat.progress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span> from last period
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    <BarChart2 className="mr-2 h-4 w-4" /> View Breakdown
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{stat.title} Breakdown</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    {stat.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{width: `${item.percentage}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {item.category} ({item.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="chart" className="mt-6">
        <TabsList>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Incident Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={chartdata}
                index="month"
                categories={["Cyberbullying", "Harassment"]}
                colors={["blue", "red"]}
                yAxisWidth={30}
                className="h-80"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => toggleSortDirection('id')}>ID</TableHead>
                    <TableHead onClick={() => toggleSortDirection('type')}>Type</TableHead>
                    <TableHead onClick={() => toggleSortDirection('severity')}>Severity</TableHead>
                    <TableHead onClick={() => toggleSortDirection('status')}>Status</TableHead>
                    <TableHead onClick={() => toggleSortDirection('date')}>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.severity}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Urgent Attention Required</AlertTitle>
        <AlertDescription>
          High-risk incidents detected. Immediate intervention recommended.
        </AlertDescription>
      </Alert>
    </ScrollArea>
  );
};

export default Statistics;
