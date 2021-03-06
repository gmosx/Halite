$(function() {
    var statTable = {
        $tableBody: $("#statTableBody"),
        init: function(stats) {
            this.stats = stats;
            this.render();
        },
        render: function() {
            this.$tableBody.empty();
            for(var a = 0; a < this.stats.length; a++) {
                this.$tableBody.append(this.getTableRow(this.stats[a]));
            }

        },
        getTableRow: function(stat) {
            return "<tr><td>"+stat.name+"</td><td>"+stat.value+"</td></tr>";    
        }
    };

    var workerTable = {
        $tableBody: $("#workerTableBody"),
        init: function(workers) {
            this.workers = workers;
            this.render();
        },
        render: function() {
            this.$tableBody.empty();
            for(var a = 0; a < this.workers.length; a++) {
                this.$tableBody.append(this.getTableRow(this.workers[a]));
            }

        },
        getTableRow: function(worker) {
            console.log(worker.lastRequestTime)
            var timeSinceCommunication = Math.round(100*((new Date() - new Date(worker.lastRequestTime+"Z")) / (1000*60))) / 100;
            return "<tr><td>"+worker.workerID+"</td><td>"+timeSinceCommunication+" min</td></tr>";  
        }
    };
    workerTable.init(getWorkers());

    var throughput = getThroughput();
    var users = getNumActiveUsers();
    var averageUsersPerGame = 4;
    statTable.init([
        {name: "Throughput", value: throughput},
        {name: "Estimated time/game/user (Avg users/game = 4)", value: ((24*60*users)/(throughput*averageUsersPerGame)).toFixed(2) + " min"},
        {name: "Active Users", value: getNumActiveUsers()},
        {name: "Total Submissions", value: getNumSubmissions()}
    ]);
})
