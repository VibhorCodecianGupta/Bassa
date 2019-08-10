(function() {
  'use strict;'

  angular.module('app')
    .controller('DriveCtrl', [ '$scope', 'ToastService', 'DriveService', 'AclService', DriveCtrl ]);

    function DriveCtrl($scope, ToastService, DriveService, AclService) {

      $scope.folder_entities = []
      $scope.file_entities = []

      user_id = UserService.getUserId()

      this.init = function () {
        $scope.children('0', user_id)
      }

      $scope.children = function (id) {
        DriveService.fetch_entity_children(id, user_id).then(function(response) {
          data = response.data
          $scope.folder_entities.length = 0
          $scope.file_entities.length = 0
          data.forEach(function(elem) {
            if (elem['type'] == 'fr') $scope.folder_entities = elem['items']
            else if (elem['type'] == 'fl') $scope.file_entities = elem['items']
          })
          AclService.pushContext(Context.build(id, 'owner'))
        }, function(error) {
          ToastService.showToast(error)
        })
      }

      $scope.get = function (id, e_type) {
        DriveService.fetch_entity(id, user_id, e_type).then(function(response) {
          ToastService.showToast('Success')
        }, function(error) {
            ToastService.showToast(error)
        })
      }

      $scope.add = function(name, e_type) {
        id = AclService.extractContext().getParentId()
        DriveService.add_entity(user_id, e_type, name, id).then(function(response) {
          if (response.status == 200) {
            // reload page, recover state
            ToastService.showToast('Success')
          }
        }, function(error) {
            ToastService.showToast(error)
        })
      }

      $scope.edit = function(id, e_type, new_name) {
        DriveService.edit_entity(id, user_id, e_type, new_name).then(function(response) {
          if (response.status == 200) {
            // reload page, recover state
            ToastService.showToast('Success')
          }
        }, function(error) {
            ToastService.showToast(error)
        })
      }

      $scope.delete = function(id, e_type) {
        DriveService.remove_entity(id, user_id, e_type).then(function(response) {
          if(response.status == 200) {
            // reload page, recover state
            ToastService.showToast('Success')
          }
        }, function(error) {
            ToastService.showToast(error)
        })
      }

      this.init()
    }
})();