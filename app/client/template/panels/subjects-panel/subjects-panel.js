Template.subjectsPanel.helpers({
  userSubjects: function () {
    var subjects = [];
    Subjects.find({
      owner: Meteor.userId()
    }).fetch().forEach(function (subject) {
      subjects.push(subject.get());
    });
    return JSON.stringify(subjects);
  },
  librarySubjects: function () {
    var subjects = [];
    Subject.find({
      owner: {
        $ne: Meteor.userId()
      }
    }).fetch().forEach(function (subject) {
      subject.inLibrary = true;
      subjects.push(subject.get());
    });
    return JSON.stringify(subjects);
  },
});
Template.subjectsPanel.events({
  //====================== events for user Subjects ==========================//
  'get-hypervideos user-library': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = Subject.findOne({
      _id: evt.subject._id
    });
    evt.hypervideos = subject.hypervideos();
    e.target.hypervideos = subject.hypervideos();
    console.info(subject.hypervideos());
    console.info(evt)
  },

  'watch-subject user-library': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = evt.subject;
    var subjectId = evt.subject._id;
    Session.set('title', subject.name);
    Session.set('subjectId', subjectId);
    Router.go('watchSubject', {
      _id: subjectId
    });
  },
  'edit-subject user-library': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = evt.subject;
    Session.set('title', subject.name);
    Session.set('subjectId', subject._id);
    Router.go('subjectPanel', {
      _id: subject._id
    });
  },
  'subject-deleted user-library': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = Subject.findOne(evt.subject._id);
    subject.remove();
  },

  //================== events for user library Subjects ======================//
  'get-hypervideos user-library': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = Subject.findOne({
      _id: evt.subject._id
    });
    evt.hypervideos = subject.hypervideos();
    e.target.hypervideos = subject.hypervideos();
    console.info(subject.hypervideos());
    console.info(evt)
  },

  'watch-subject user-library': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var subject = evt.subject;
    var subjectId = evt.subject._id;
    Session.set('title', subject.name);
    Session.set('subjectId', subjectId);
    Router.go('watchSubject', {
      _id: subjectId
    });
  },
  'remove-library-subject user-library': function (e, template) {
    var evt = e.originalEvent.path["0"].__data__;
    var librarySubject = LibrarySubject.findOne({
      userId: Meteor.userId(),
      subjectId: evt.subject._id
    });
    librarySubject.remove();
  },

});
