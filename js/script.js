document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const elements = {
    dropdownToggle: document.getElementById('dropdown-toggle'),
    dropdownMenu: document.getElementById('dropdown-menu'),
    dropdownItems: document.querySelectorAll('.dropdown-item'),
    hamburgerMenu: document.getElementById('hamburger-menu'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    cards: document.querySelectorAll('.card'),
    balanceCard: document.querySelector('.balance-card'),
    canvas: document.getElementById('analytics-chart')
  };
    
  // Chart Configuration
  const chartConfig = {
    data: {
      weekly: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        blueData: [14000, 10500, 13500, 5800, 15000, 12000, 13500, 7800, 20000, 8000, 18000, 14500],
        yellowData: [4800, 6000, 9000, 5500, 6000, 10000, 7500, 4500, 6000, 7500, 5000, 9000]
      },
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        blueData: [12000, 13000, 15000, 16000, 12500, 14000, 18000, 17000, 16000, 15000, 16500, 18000],
        yellowData: [5000, 6500, 7000, 6000, 5500, 8000, 9000, 8500, 7000, 6500, 8000, 9500]
      },
      yearly: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        blueData: [10000, 12000, 11000, 15000, 13000, 16000, 19000],
        yellowData: [4000, 5000, 4500, 6000, 7000, 8000, 9000]
      }
    }
  };
  
  // Card Selection
  const initializeCardSelection = () => {
    const { cards, balanceCard } = elements;
    
    if (balanceCard) {
      balanceCard.classList.add('selected');
    }
    
    cards.forEach(card => {
      card.addEventListener('click', function() {
        cards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  };
  
  // Dropdown Menu
  const initializeDropdown = () => {
    const { dropdownToggle, dropdownMenu, dropdownItems } = elements;
    
    if (!dropdownToggle || !dropdownMenu) return;
    
    dropdownToggle.addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', (event) => {
      if (dropdownToggle && dropdownMenu && 
          !dropdownToggle.contains(event.target) && 
          !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
    
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const text = this.textContent;
        
        if (dropdownToggle) {
          dropdownToggle.textContent = text;
        }
        
        if (dropdownMenu) {
          dropdownMenu.classList.remove('show');
        }
        
        if (analyticsChart) {
          updateChartData(value);
        }
      });
    });
  };
  
  // Sidebar
  const initializeSidebar = () => {
    const { hamburgerMenu, sidebar, sidebarOverlay } = elements;
    
    if (!hamburgerMenu || !sidebar || !sidebarOverlay) return;
    
    const toggleSidebar = () => {
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
      document.body.classList.toggle('sidebar-open');
    };
    
    hamburgerMenu.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      }
    });
    
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          toggleSidebar();
        }
      });
    });
  };
  
  // Analytics Chart
  let analyticsChart = null;
  
  const initializeChart = () => {
    const { canvas } = elements;
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create gradients exactly as in the original code
    const blueGradient = ctx.createLinearGradient(0, 0, 0, 300);
    blueGradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    blueGradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
    
    const yellowGradient = ctx.createLinearGradient(0, 0, 0, 300);
    yellowGradient.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
    yellowGradient.addColorStop(1, 'rgba(245, 158, 11, 0.0)');
    
    // Create chart with exact same options as the original
    analyticsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartConfig.data.weekly.labels,
        datasets: [{
          label: 'Label 1',
          data: chartConfig.data.weekly.blueData,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: blueGradient,
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointHoverBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          order: 1
        },
        {
          label: 'Label 1',
          data: chartConfig.data.weekly.yellowData,
          borderColor: 'rgb(245, 158, 11)',
          backgroundColor: yellowGradient,
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgb(245, 158, 11)',
          pointHoverBackgroundColor: 'rgb(245, 158, 11)',
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          order: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1e293b',
            bodyColor: '#1e293b',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw.toLocaleString();
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12
              }
            }
          },
          y: {
            grid: {
              color: '#f1f5f9',
              drawBorder: false
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12
              },
              callback: function(value) {
                if (value === 0) return '0k';
                return (value / 1000) + 'k';
              },
              stepSize: 5000
            },
            suggestedMin: 0,
            suggestedMax: 22000
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        elements: {
          line: {
            tension: 0.4
          }
        }
      }
    });
  };
  
  // Chart data update function
  const updateChartData = (period) => {
    if (!analyticsChart || !chartConfig.data[period]) return;
    
    const data = chartConfig.data[period];
    
    analyticsChart.data.labels = data.labels;
    analyticsChart.data.datasets[0].data = data.blueData;
    analyticsChart.data.datasets[1].data = data.yellowData;
    
    analyticsChart.update();
  };
  
  // Initialize all components
  try {
    initializeCardSelection();
    initializeDropdown();
    initializeSidebar();
    initializeChart();
  } catch (error) {
    console.error('Error initializing dashboard:', error);
  }
  
  // Expose functions for potential external use
  window.dashboardAPI = {
    updateChartData
  };
});