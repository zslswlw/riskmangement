// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'profiles works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {};

    if (req.body.place) profileFields.place = req.body.place;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.grade) profileFields.grade = req.body.grade;
    if (req.body.reason) profileFields.reason = req.body.reason;
    if (req.body.handler) profileFields.handler = req.body.handler;
    if (req.body.deadline) profileFields.deadline = req.body.deadline;
    if (req.body.condition) profileFields.condition = req.body.condition;
    if (req.body.monitor) profileFields.monitor = req.body.monitor;
    if (req.body.rectify) profileFields.rectify = req.body.rectify;
    if (req.body.remark) profileFields.remark = req.body.remark;
    if (req.body.image1) profileFields.image1 = req.body.image1;
    if (req.body.image2) profileFields.image2 = req.body.image2;
    if (req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile => {
      res.json(profile);
    });
  }
);

// @route  GET api/profiles
// @desc   获取所有信息
// @access Private

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        if (!profile) {
          return res.status(404).json('没有任何内容');
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/profiles/:id
// @desc   获取单个信息
// @access Private

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json('没有任何内容');
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/profiles/edit
// @desc   编辑信息接口
// @access Private
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {};

    if (req.body.place) profileFields.place = req.body.place;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.grade) profileFields.grade = req.body.grade;
    if (req.body.reason) profileFields.reason = req.body.reason;
    if (req.body.handler) profileFields.handler = req.body.handler;
    if (req.body.deadline) profileFields.deadline = req.body.deadline;
    if (req.body.condition) profileFields.condition = req.body.condition;
    if (req.body.monitor) profileFields.monitor = req.body.monitor;
    if (req.body.rectify) profileFields.rectify = req.body.rectify;
    if (req.body.remark) profileFields.remark = req.body.remark;
    if (req.body.image1) profileFields.image1 = req.body.image1;
    if (req.body.image2) profileFields.image2 = req.body.image2;
    if (req.body.remark) profileFields.remark = req.body.remark;


    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    ).then(profile => res.json(profile));
  }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then(profile => {
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);

module.exports = router;
