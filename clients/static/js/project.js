(function() {

    // Lets create our angular module
    var project365_app = angular.module('project365_app', ["ngRoute", "ng-fusioncharts"]);



    // CLIENTSIDE ROUTING
    project365_app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html'
            })
            .when('/login', {
                templateUrl: 'partials/login.html'
            })
            .when('/new_project', {
                templateUrl: 'partials/newproject.html'
            })
            .when('/thankyou', {
                templateUrl: 'partials/thankyou.html'
            })
            .when('/admin', {
                templateUrl: 'partials/admin.html'
            })
            .when('/admindashboard', {
                templateUrl: 'partials/admindashboard.html'
            })
            .when('/show_project', {
                templateUrl: 'partials/showproject.html'
            })
            .when('/donate', {
                templateUrl: 'partials/donate.html'
            })
            .otherwise({
                redirectTo: '/'
            });

          


    });

    project365_app.controller('projectController', function($scope, $location, $routeParams, $rootScope, projectFactory) {


        // $scope.data = [{label: "new_project.category1", value: 500}, {label: "new_project.category1", value: 300} ];

        $scope.myDataSource = {
            chart: {
                caption: "Project Funding Breakdown",
                subcaption: "",
                startingangle: "120",
                showlabels: "0",
                showlegend: "1",
                enablemultislicing: "0",
                slicingdistance: "15",
                showpercentvalues: "1",
                showpercentintooltip: "0",
                plottooltext: "Amount of $ : $label Total visit : $datavalue",
                theme: "fint"
            },
            data: [{
                label: "",
                value: ""
                }, {
                label: "",
                value: ""
                }, {
                label: "",
                value: ""
                }, {
                label: "",
                value: ""
                }, {
                label: "",
                value: ""
                }]
            };

        $scope.updateMyChartData = function() {
            // for (var i=0; i < count; i++)
            $scope.myDataSource.chart.subcaption = $scope.new_project.title;
            $scope.myDataSource.data[1].label = $scope.new_project.category1;
            $scope.myDataSource.data[1].value = $scope.new_project.category1_1;
            $scope.myDataSource.data[2].label = $scope.new_project.category2;
            $scope.myDataSource.data[2].value = $scope.new_project.category2_2;
            $scope.myDataSource.data[3].label = $scope.new_project.category3;
            $scope.myDataSource.data[3].value = $scope.new_project.category3_3;
            $scope.myDataSource.data[4].label = $scope.new_project.category4;
            $scope.myDataSource.data[4].value = $scope.new_project.category4_4;
        }
         
     
      


        $scope.addproject = function() {
            var addproject_repack = {
                user_id: "Surag Sheth",
                title: $scope.new_project.title,
                short_description: $scope.new_project.short_description,
                mission: $scope.new_project.mission,
                category: $scope.new_project.category,
                location: $scope.new_project.location,
                video_url: $scope.new_project.video_url,
                data_breakdown: [{label:$scope.new_project.category1, value:$scope.new_project.category1_1},{label:$scope.new_project.category2, value:$scope.new_project.category2_2},{label:$scope.new_project.category3, value:$scope.new_project.category3_3},{label:$scope.new_project.category4, value:$scope.new_project.category4_4}],
                full_description: $scope.new_project.full_description,
                status: "Pending",
                // data_breakdown: $scope.new_project.data_breakdown,
                created_at: new Date()
            };

            console.log(addproject_repack);

            // note the use of callbacks here
            projectFactory.addProject(addproject_repack, function(data) {
                console.log("Project Call Back Worked");
                $scope.new_project = {};
                $location.path('/thankyou');
            });
        };
    });




    project365_app.factory('projectFactory', function($http) {
        var factory = {};

        factory.addProject = function(info, callback) {
            console.log(info);
            $http.post("/add_project", info).success(function(output) {
                callback(output);
            });
        };
        return factory;
    });








project365_app.controller("userController", function($scope, $location, $routeParams, $rootScope, userFactory) {
        $scope.user = $routeParams.user;
        $scope.dashboard = $routeParams.dashboard;
        $scope.project = $routeParams.project;

        console.log($routeParams);


        $scope.getone = function(project){
            userFactory.getOne(project, function(data){
            $scope.project = data[0];
            $location.path('/show_project').search({project: data});
          });      
        };



        $scope.adduser = function() {
            var newuser_repack = {
                first_name: $scope.new_user.first_name,
                last_name: $scope.new_user.last_name,
                occupation: $scope.new_user.occupation,
                email: $scope.new_user.email,
                password: $scope.new_user.password,
                created_at: new Date()
            };
            console.log(newuser_repack);

            // note the use of callbacks here
            userFactory.addUser(newuser_repack, function(data) {
                $scope.user = data;
                $scope.new_user = {};
                $location.path('/').search({user: data});
            });
        };


        userFactory.getDashboard(function(data) {
            $scope.dashboard = data;
            // console.log($scope.dashboard);
        });





        $scope.loginuser = function() {
            var login_user_repack = {
                email: $scope.login_user.email,
                password: $scope.login_user.password,
                logged_in_at: new Date()
            };
            userFactory.loginUser(login_user_repack, function(data) {
                if (data.length > 0){
                  console.log("get back", data);
                  $scope.login_user = {};
                  $location.path('/').search({user: data});
                } else {       
                  $scope.errors = {error: "Either your Email or Password Do Not Match"};

                }
                // $scope.errors = {};

            });
        };



        $scope.loginadmin = function() {
            var login_user_repack = {
                email: $scope.login_user.email,
                password: $scope.login_user.password,
                logged_in_at: new Date()
            };
            userFactory.loginUser(login_user_repack, function(data) {
                $scope.login_user = {};
                userFactory.getDashboard(function(data) {
                    $scope.dashboard = data;
                    // console.log($scope.dashboard);
                });
                $location.path('/admindashboard').search({
                    dashboard: data
                });
            });
        };


        userFactory.logedInUser(function(data) {
            if (data) {
                $scope.user = data[0];
                $("#login").hide();
                $("#logedin").show();
                $("#proposednav").show();

            } 
        });


    });



    


    project365_app.factory('userFactory', function($http) {
        var factory = {};
        var current_user;
        var admin;

        factory.getDashboard = function(callback) {
            $http.get("/all_projects").success(function(output) {
                // console.log(output)
                callback(output);
            });
        };

        factory.getOne = function(info, callback){
              $http.post("/get_one", info).success(function(output){
                console.log("GETTTTING", output);
                callback(output);
          });
        };
        

        factory.logedInUser = function(callback) {
            if (current_user !== undefined) {
                var output = current_user;
                callback(output);
            };

        };

        factory.addUser = function(info, callback) {
            console.log(info);
            $http.post("/register", info).success(function(output) {
              console.log("just registered", output);
                current_user = output[0];
                console.log("current_user");
                callback(output);
            });
        };

        factory.loginUser = function(info, callback) {
            $http.post("/login", info).success(function(output) {
                console.log("responce", output);
                current_user = output;
                callback(output);
            });
        };
        return factory;
    });



}());