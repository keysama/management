-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-08-11 09:37:53
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `manage`
--

-- --------------------------------------------------------

--
-- 表的结构 `book`
--

CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `holder` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- 表的结构 `book_user`
--

CREATE TABLE IF NOT EXISTS `book_user` (
  `book` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `mark` varchar(255) DEFAULT NULL,
  `state` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`book`,`member`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `daily`
--

CREATE TABLE IF NOT EXISTS `daily` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '归属的项目id',
  `title` varchar(55) DEFAULT '无标题' COMMENT '标题',
  `content` varchar(510) NOT NULL COMMENT '日志内容',
  `editor` int(11) NOT NULL COMMENT '作者id',
  `uploadtime` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `link_pro_dai` (`pid`),
  KEY `kink_user_dai` (`editor`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

-- --------------------------------------------------------

--
-- 表的结构 `daily_comment`
--

CREATE TABLE IF NOT EXISTS `daily_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `did` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `content` varchar(510) NOT NULL,
  `uploadtime` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `link_daily_comment` (`did`),
  KEY `link_user_comment` (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

-- --------------------------------------------------------

--
-- 表的结构 `daily_img`
--

CREATE TABLE IF NOT EXISTS `daily_img` (
  `did` int(11) NOT NULL COMMENT '对应日志id',
  `name` varchar(55) NOT NULL COMMENT '图片名',
  `time` varchar(25) NOT NULL COMMENT '不是上传时间，是序号',
  KEY `link_daily` (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user` int(11) NOT NULL COMMENT '上传人',
  `project` int(11) NOT NULL COMMENT '所属的工程id',
  `type` int(11) NOT NULL COMMENT '订单类型，0：铝型材，1：钢型材，2：板材，3：钢加工件，4：辅助材料',
  `title` varchar(25) NOT NULL COMMENT '订单名称',
  `position` varchar(55) DEFAULT NULL COMMENT '位置',
  `target_position` varchar(55) DEFAULT NULL COMMENT '送货地点',
  `specifications` varchar(255) DEFAULT NULL COMMENT '技术要求',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `timestemp` varchar(20) NOT NULL COMMENT '创建时间',
  `processing` varchar(150) DEFAULT '' COMMENT '审核流程，空：未提交，1：待审核，2：未通过，3：审核通过，4：待查收，5：被退回，6：被查收',
  `auditor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `link_auditor` (`auditor`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

-- --------------------------------------------------------

--
-- 表的结构 `order_files`
--

CREATE TABLE IF NOT EXISTS `order_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `oid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `uploader` int(11) NOT NULL,
  `uploadtime` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `link_files_oid` (`oid`),
  KEY `link_files_uid` (`uploader`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- 表的结构 `order_sheet_ban`
--

CREATE TABLE IF NOT EXISTS `order_sheet_ban` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '提料单id',
  `oid` int(11) NOT NULL COMMENT '所属订单id',
  `name` varchar(55) NOT NULL DEFAULT '' COMMENT '2,名称',
  `codehead` varchar(55) DEFAULT NULL COMMENT '2,编号前缀',
  `code` varchar(55) NOT NULL COMMENT '2，编号',
  `width` varchar(25) NOT NULL COMMENT '2，宽度',
  `height` varchar(25) NOT NULL COMMENT '2,高度',
  `num` varchar(25) NOT NULL COMMENT '2，数量',
  `acreage` varchar(55) NOT NULL COMMENT '2,单位面积',
  `number` varchar(25) NOT NULL COMMENT '2，加工图编号',
  `remark` varchar(255) DEFAULT NULL COMMENT '2,备注',
  PRIMARY KEY (`id`),
  KEY `order_link4` (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- 表的结构 `order_sheet_fu`
--

CREATE TABLE IF NOT EXISTS `order_sheet_fu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '提料单id',
  `oid` int(11) NOT NULL COMMENT '所属订单id',
  `name` varchar(55) NOT NULL COMMENT '4.名称',
  `standard` varchar(55) DEFAULT NULL COMMENT '4，规格',
  `quality` varchar(55) DEFAULT NULL COMMENT '4，材质',
  `unit` varchar(55) NOT NULL COMMENT '4,单位',
  `num` varchar(25) NOT NULL COMMENT '4,数量',
  `brand` varchar(55) DEFAULT NULL COMMENT '4，品牌',
  `remark` varchar(255) DEFAULT NULL COMMENT '4，备注',
  PRIMARY KEY (`id`),
  KEY `order_link6` (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- 表的结构 `order_sheet_gang`
--

CREATE TABLE IF NOT EXISTS `order_sheet_gang` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '提料单id',
  `oid` int(11) NOT NULL COMMENT '所属订单id',
  `name` varchar(55) NOT NULL DEFAULT '1,名称',
  `standard` varchar(55) DEFAULT NULL COMMENT '1，规格',
  `quality` varchar(55) NOT NULL COMMENT '1,材质',
  `dispose` varchar(55) NOT NULL COMMENT '1,表面处理方式',
  `length` varchar(25) NOT NULL COMMENT '1,长度',
  `num` varchar(25) NOT NULL COMMENT '1，数量',
  `rou` varchar(25) DEFAULT NULL COMMENT '1，线密度',
  `remark` varchar(255) DEFAULT NULL COMMENT '1,备注',
  PRIMARY KEY (`id`),
  KEY `order_link3` (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- 表的结构 `order_sheet_jian`
--

CREATE TABLE IF NOT EXISTS `order_sheet_jian` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '提料单id',
  `oid` int(11) NOT NULL COMMENT '所属订单id',
  `name` varchar(55) NOT NULL COMMENT '3,名称',
  `code` varchar(55) DEFAULT NULL COMMENT '3,编号',
  `dispose` varchar(55) DEFAULT NULL COMMENT '3，表面处理方式',
  `num` varchar(15) NOT NULL COMMENT '3，件数',
  `weight` varchar(15) NOT NULL COMMENT '3,单件重量',
  `number` varchar(25) NOT NULL COMMENT '3，加工图编号',
  `remark` varchar(255) DEFAULT NULL COMMENT '3,备注',
  PRIMARY KEY (`id`),
  KEY `order_link5` (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- 表的结构 `order_sheet_lv`
--

CREATE TABLE IF NOT EXISTS `order_sheet_lv` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '提料单id',
  `oid` int(11) NOT NULL COMMENT '所属订单id',
  `name` varchar(55) NOT NULL COMMENT '0，名称',
  `code` varchar(55) NOT NULL DEFAULT '' COMMENT '0，型材代号',
  `quality` varchar(55) DEFAULT NULL COMMENT '0,材质',
  `dispose` varchar(55) NOT NULL COMMENT '0，表面喷涂处理',
  `color` varchar(55) NOT NULL COMMENT '0，喷涂色号',
  `length` varchar(25) NOT NULL COMMENT '0,长度',
  `num` varchar(25) NOT NULL COMMENT '0，数量',
  `rou` varchar(55) DEFAULT NULL COMMENT '0，线密度',
  `remark` varchar(255) DEFAULT NULL COMMENT '0,备注',
  PRIMARY KEY (`id`),
  KEY `order_link2` (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- 表的结构 `pro`
--

CREATE TABLE IF NOT EXISTS `pro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL COMMENT '工程名',
  `number` varchar(50) NOT NULL COMMENT '工程代号',
  `address` varchar(50) DEFAULT NULL COMMENT '项目地址',
  `yezhu` varchar(30) DEFAULT NULL COMMENT '建设单位',
  `design` varchar(50) DEFAULT NULL COMMENT '建筑设计单位',
  `danwei` varchar(50) DEFAULT NULL COMMENT '总包单位',
  `mdanwei` varchar(50) DEFAULT NULL COMMENT '幕墙设计单位',
  `introduce` varchar(255) DEFAULT NULL COMMENT '简介',
  `createtime` varchar(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- 表的结构 `pro_user`
--

CREATE TABLE IF NOT EXISTS `pro_user` (
  `pro` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `job` tinyint(2) NOT NULL COMMENT '0：创建者，1：参与人，2：材料商，3：领导',
  `state` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0:未接受，1:已接受',
  `jointime` varchar(20) DEFAULT '' COMMENT '同意的时间，state变为1的时间',
  PRIMARY KEY (`pro`,`member`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `rou_lv`
--

CREATE TABLE IF NOT EXISTS `rou_lv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(55) DEFAULT NULL COMMENT '型材名称',
  `code` varchar(55) NOT NULL COMMENT '型材代号',
  `rou` varchar(55) NOT NULL COMMENT '线密度',
  `uploadtime` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `link_rou_pid` (`pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `departments` varchar(25) DEFAULT '未填写',
  `password` varchar(25) NOT NULL,
  `type` tinyint(3) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`username`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 限制导出的表
--

--
-- 限制表 `daily`
--
ALTER TABLE `daily`
  ADD CONSTRAINT `kink_user_dai` FOREIGN KEY (`editor`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `link_pro_dai` FOREIGN KEY (`pid`) REFERENCES `pro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `daily_comment`
--
ALTER TABLE `daily_comment`
  ADD CONSTRAINT `link_daily_comment` FOREIGN KEY (`did`) REFERENCES `daily` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `link_user_comment` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `daily_img`
--
ALTER TABLE `daily_img`
  ADD CONSTRAINT `link_daily` FOREIGN KEY (`did`) REFERENCES `daily` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `link_auditor` FOREIGN KEY (`auditor`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- 限制表 `order_files`
--
ALTER TABLE `order_files`
  ADD CONSTRAINT `link_files_uid` FOREIGN KEY (`uploader`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `link_files_oid` FOREIGN KEY (`oid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `order_sheet_ban`
--
ALTER TABLE `order_sheet_ban`
  ADD CONSTRAINT `order_link4` FOREIGN KEY (`oid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `order_sheet_fu`
--
ALTER TABLE `order_sheet_fu`
  ADD CONSTRAINT `order_link6` FOREIGN KEY (`oid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `order_sheet_gang`
--
ALTER TABLE `order_sheet_gang`
  ADD CONSTRAINT `order_link3` FOREIGN KEY (`oid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `order_sheet_jian`
--
ALTER TABLE `order_sheet_jian`
  ADD CONSTRAINT `order_link5` FOREIGN KEY (`oid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `order_sheet_lv`
--
ALTER TABLE `order_sheet_lv`
  ADD CONSTRAINT `order_link2` FOREIGN KEY (`oid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `rou_lv`
--
ALTER TABLE `rou_lv`
  ADD CONSTRAINT `link_rou_pid` FOREIGN KEY (`pid`) REFERENCES `pro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
