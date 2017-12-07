Annotations = new Mongo.Collection('annotations');

Annotation = Astro.Class({
  name: 'Annotation',
  collection: Annotations,
  fields: {
    name:{
      type: 'string',
    },
    description:{
      type: 'string',
    },
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    start:{
      type: 'number',
      default: 0,
      validator: Validators.required(),
    },
    duration:{
      type: 'number'
    },
    type:{
      type: 'string',
      validator: Validators.required(),
    },
    hypervideoId:{
      type: 'string',
      validator: Validators.required(),
    },
    source:{
      type: 'string',
      validator: Validators.required(),
    },
    video:{
      type: 'object'
    },
    size:{
      type: 'number'
    },
    position: {
      type: 'number'
    },
    text:{
      type: 'string'
    },
    link:{
      type: 'string'
    },
    question:{
      type: 'string'
    },
    answerCorrect:{
      type: 'string'
    },
    answerWrong1:{
      type: 'string'
    },
    answerWrong2:{
      type: 'string'
    },
    answerWrong3:{
      type: 'string'
    },
    answerWrong4:{
      type: 'string'
    },

  },
  events: {
    beforeremove: function () {
      var video = this.video;
      if (video) {
        video.remove();
      }
    },
    beforeinit: function () {
      this.getVideo();
    }
  },
  methods:{
    getVideo : function(){
      this.video = Videos.findOne({annotationId: this._id});
    }
  },
  behaviors: ['timestamp']
});
