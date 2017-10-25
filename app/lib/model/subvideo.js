Subvideos = new Mongo.Collection('subvideos');

VidStore = new FS.Store.GridFS('medias', {
  path: '~/git/tcc/hypervideos/uploads/medias'
});
Videos = new FS.Collection('videos', {
  stores: [VidStore],
  filter: {
    maxSize: 200000000, // 200 MB
    onInvalid: function (msg) {
      document.querySelector('#notify').message = msg;
    }
  }
});

Subvideo = Astro.Class({
  name: 'Subvideo',
  collection: Subvideos,
  fields: {
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    name: {
      type: 'string',
      default: 'Novo subvideo',
      validator: Validators.and([
        Validators.required('O nome não pode ser vazio'),
        Validators.string(),
        Validators.minLength(3, 'Nome muito curto'),
      ])
    },
    hypervideoId: {
      type: 'string',
      validator: Validators.required(),
    },
    mediaId: {
      type: 'string',
      validator: Validators.required(),
    },
    description: {
      type: 'string',
      default: 'Descrição desse subvideo',
      validator: Validators.and([
        Validators.required('A descrição não pode ser vazia'),
        Validators.string(),
        Validators.minLength(10, 'descrição muito curto'),
        Validators.maxLength(3000, 'descrição muito longo')
      ])
    },
    x: {
      type: 'number',
      validator: Validators.required(),
    },
    y: {
      type: 'number',
      validator: Validators.required(),
    },
    visibility: {
      type: 'number',
      default: 1,
      validator: Validators.choice([1, 2, 3, 4, 5])
    }
  },
  events: {
    beforeremove: function () {
      var media = this.media();
      if (media) {
        media.remove();
      }
    }
  },
  methods: {
    media: function () {
      return Videos.findOne({
        _id: this.mediaId
      });
    },
    move: function (x, y) {
      this.x = x;
      this.y = y;
    }
  },
  behaviors: ['timestamp']
});
