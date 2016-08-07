angular.module('my-eggly', [])
.controller ('MainCtrl', function($scope) {

    $scope.categories = [
        {id: 0, name: 'Development'},
        {id: 1, name: 'Design'},
        {id: 2, name: 'Exercise'},
        {id: 3, name: 'Humor'}
    ];

    $scope.bookmarks = [
        {id: 0, title: 'Egghead', url: 'https://egghead.io/', category: 'Development'},
        {id: 1, title: 'Bootstrap', url: 'http://getbootstrap.com/', category: 'Design'},
        {id: 2, title: 'Html Academy', url: 'https://htmlacademy.ru/', category: 'Exercise'},
        {id: 3, title: 'VK', url: 'https://new.vk.com/', category: 'Humor'}
    ];

    $scope.currentCategory = null;

    $scope.setCurrentCategory = function(category) {
        $scope.currentCategory = category;
    };

    $scope.isCurrentCategory = function(category) {
        return category !== null && $scope.currentCategory === category;
    };

    // CRUD

    $scope.resetCreateForm = function () {
        $scope.newBookmark = {
            title: '',
            url: '',
            category: $scope.currentCategory.name
        }
    };

    $scope.createBookmark = function (bookmark) {
        bookmark.id = $scope.bookmarks.length;
        $scope.bookmarks.push(bookmark);

        $scope.resetCreateForm();
    };

    $scope.editedBookmark = null;

    $scope.setEditedBookmark = function (bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
    };

    $scope.updateBookmark = function (bookmark) {
        var index = _.findIndex($scope.bookmarks, function(b) {
            return b.id === bookmark.id;
        });
        $scope.bookmarks[index] = bookmark;

        $scope.editedBookmark = null;
        $scope.isEditing = false;
    };

    $scope.isSelectedBookmark = function (bookmark) {
        return $scope.editedBookmark !== null && $scope.editedBookmark.id == bookmark.id;
    };

    $scope.deleteBookmark = function (bookmark) {
        _.remove($scope.bookmarks, function(b) {
            return b.id == bookmark.id;
        })
    };

    // STATES

    $scope.isCreating = false;
    $scope.isEditing = false;

    $scope.startCreating = function () {
        $scope.isCreating = true;
        $scope.isEditing = false;

        $scope.resetCreateForm();
    };

    $scope.startEditing = function () {
        $scope.isCreating = false;
        $scope.isEditing = true;
    };

    $scope.resetMode = function () {
        $scope.isCreating = false;
        $scope.isEditing = false;
    };

    $scope.shouldCreate = function () {
        return $scope.currentCategory && !$scope.isEditing;
    };

    $scope.shouldEdit = function () {
        return $scope.isEditing && !$scope.isCreating;
    }
});