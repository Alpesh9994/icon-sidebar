import { Component, OnInit } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  stats: StatCard[] = [
    { 
      title: 'Total Users', 
      value: '2,543', 
      change: '+12.5%', 
      isPositive: true,
      icon: 'users'
    },
    { 
      title: 'Revenue', 
      value: '$45,678', 
      change: '+8.2%', 
      isPositive: true,
      icon: 'dollar-sign'
    },
    { 
      title: 'Active Projects', 
      value: '127', 
      change: '-3.1%', 
      isPositive: false,
      icon: 'folder'
    },
    { 
      title: 'Completion Rate', 
      value: '94.5%', 
      change: '+2.4%', 
      isPositive: true,
      icon: 'trending-up'
    },
  ];

  activities: Activity[] = [
    { id: 1, user: 'John Doe', action: 'Created a new report', time: '5 mins ago' },
    { id: 2, user: 'Sarah Smith', action: 'Updated user settings', time: '12 mins ago' },
    { id: 3, user: 'Mike Johnson', action: 'Completed project review', time: '1 hour ago' },
    { id: 4, user: 'Emily Brown', action: 'Added new team members', time: '2 hours ago' },
  ];

}
