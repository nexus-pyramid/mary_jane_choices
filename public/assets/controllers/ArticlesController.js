app.controller('ArticlesController', function($scope, $timeout, Upload, $location) {
  $scope.fileReaderSupported = window.FileReader !== null;
  // create new articles
  // var articleData = {
  //   title: $scope.formData.title,
  //   content: $scope.formData.content,
  // }
  $scope.submit = function(){
    $scope.upload($scope.file);
  }
  $scope.uploadPic = function(file) {
    console.log(file);
    file.upload = Upload.upload({
      url: '/articleupload',
      data: { file: file, title: $scope.title, content: $scope.content }
    })
    file.upload.then(function (response) {
     $timeout(function () {
       file.result = response.data;
     });
    }, function (response) {
     if (response.status > 0)
       $scope.errorMsg = response.status + ': ' + response.data;
     }, function (evt) {
     // Math.min is to fix IE which reports 200% sometimes
     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        console.log(file);
        console.log($scope.f);
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/articleupload',
                data: {file: file, title: $scope.title, content: $scope.content }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
    }
  // $scope.create = function(picFile){
  //   console.log('create');
  //   console.log(picFile);
  //   var article = new Article {
  //     title: this.title,
  //     content: this.conent,
  //     image: null
  //   });
  //   consoel.log(article)
  //   $upload.upload({
  //     url: '/articleupload',
  //     method: 'POST',
  //     headers: {'Content-Type': 'multipart/form-data'},
  //     fields: {article: article},
  //     file: picFile,
  //   }).success(function (response, status) {
  //     $location.path('articles/' + response._id);
  //     $scope.title = '';
  //     $scope.content = '';
  //   }).error(function (err){
  //     $scope.error = err.data.message;
  //   });
  // };

})
