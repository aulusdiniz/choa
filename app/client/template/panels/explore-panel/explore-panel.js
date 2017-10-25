var options = {
  keepHistory: 0,
  localSearch: false
};
var fields = ['name'];

SubjectsSearch = new SearchSource('subjects', fields, options);

Template.explorePanel.helpers({
  subjects: function () {
    var data =  SubjectsSearch.getData({
      sort: {
        name: -1
      }
    });
    var subjects = [];
    data.forEach(function (subject) {
      var localSubject = Subject.findOne({_id: subject._id});
      localSubject.inUserLibrary();
      subjects.push(localSubject.get());
    });
    return JSON.stringify(subjects);
  },
  isLoading: function () {
    var loading = SubjectsSearch.getStatus().loading || false;
    return loading;
  }
});

Template.explorePanel.events({
  'get-hypervideos hyper-search': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = Subject.findOne({
      _id: evt.subject._id
    });
    var oe = e.originalEvent.path["0"];
    oe.hypervideos = subject.hypervideos();
  },
  'watch-subject hyper-search': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = Subject.findOne({
      _id: evt.subject._id
    });
    Session.set('title', subject.name);
    Session.set('subjectId', subject._id);
    Template.explorePanel.addLibrarySubject(subject._id);
    subject.save();
    Router.go('watchSubject', {
      _id: subject._id
    });
  },
  'add-library-subject hyper-search': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = Subject.findOne({
      _id: evt.subject._id
    });
    Template.explorePanel.addLibrarySubject(subject._id);
    subject.save();
  },
  'remove-library-subject hyper-search': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = Subject.findOne({
      _id: evt.subject._id
    });
    var librarySubject = LibrarySubject.findOne({
      userId: Meteor.userId(),
      subjectId: subject._id
    });
    librarySubject.remove();
    subject.save();
  },
  'search-subjects hyper-search': function (e) {
    var text = e.originalEvent.detail.query;
    SubjectsSearch.search(text);
  }
});

Template.explorePanel.addLibrarySubject = function (subjectId) {
  var librarySubject = LibrarySubject.findOne({subjectId: subjectId});
  if (!librarySubject) {
    librarySubject = new LibrarySubject({
      subjectId: subjectId,
      userId: Meteor.userId(),
    });
    librarySubject.generateId();
    if (librarySubject.validate()) {
      librarySubject.save();
    }
  }
};
