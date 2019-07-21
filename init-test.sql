--
-- 用户表
--
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `commodity`;
DROP TABLE IF EXISTS `deliver`;
DROP TABLE IF EXISTS `vendor`;
DROP TABLE if EXISTS `user`;


CREATE TABLE `user` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_session_key` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_nickname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'NewUser',
  `user_email` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `user_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `user_gender` tinyint DEFAULT -1,
  `user_shipping_address` json NULL
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `user` (user_openid, user_session_key, user_nickname) values ('o0RrU5KzmQfD3fbZvpsxiG8HbEB0', 'N2m/Rnt2FMbMgmarp+wtLw==', 'Admin');

--
-- 供货商表
--
CREATE TABLE `vendor` (
  `vendor_id` int PRIMARY KEY AUTO_INCREMENT,
  `vendor_password` varchar(100) NOT NULL,
  `vendor_last_login_time` timestamp,
  `vendor_register_time` timestamp DEFAULT now()
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `vendor` (vendor_password) values('Passw0rd!');

--
-- 物流商表
--
CREATE TABLE `deliver` (
  `deliver_id` int PRIMARY KEY AUTO_INCREMENT,
  `deliver_name` varchar(100) NOT NULL
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `deliver` (`deliver_name`) VALUES ('顺丰快运');
INSERT INTO `deliver` (`deliver_name`) VALUES ('京东快递');
INSERT INTO `deliver` (`deliver_name`) VALUES ('圆通快递');
INSERT INTO `deliver` (`deliver_name`) VALUES ('申通快递');

--
-- 商品表
--
CREATE TABLE `commodity` (
  `commodity_id` int PRIMARY KEY AUTO_INCREMENT,
  `commodity_name` varchar(200),
  `commodity_price` float DEFAULT 1,
  `commodity_stock` int DEFAULT 1,
  `commodity_sold` int DEFAULT 0,
  `commodity_status` tinyint DEFAULT 0,
  `commodity_detail` text,
  `commodity_cover` varchar(1000),
  `commodity_create_date` timestamp default now(),
  `vendor_id` int,
  FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `commodity` (`commodity_name`, `commodity_detail`, `commodity_cover`, `vendor_id`) VALUES ('测试商品【1】', '测试商品详情【1】', 'http://img1.gtimg.com/ln/pics/hv1/130/149/2226/144783775.jpeg', 1);
INSERT INTO `commodity` (`commodity_name`, `commodity_detail`, `commodity_cover`, `vendor_id`) VALUES ('测试商品【2】', '测试商品详情【2】', 'http://image1.suning.cn/uimg/b2c/newcatentries/0070129708-000000000186704426_1_800x800.jpg', 1);
INSERT INTO `commodity` (`commodity_name`, `commodity_detail`, `commodity_cover`, `vendor_id`) VALUES ('测试商品【3】', '测试商品详情【3】', 'http://image2.suning.cn/uimg/b2c/newcatentries/0070153884-000000000623667571_3_800x800.jpg', 1);

--
-- 购物车表
--
CREATE TABLE `cart` (
  `cart_id` int PRIMARY KEY AUTO_INCREMENT,
  `cart_item` json,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `cart` (`cart_item`, `user_id`) VALUES ('{}', 1);

--
-- 订单表
--
CREATE TABLE `order` (
  `order_id` int PRIMARY KEY AUTO_INCREMENT,
  `order_item` json,
  `order_status` tinyint DEFAULT 0,
  `order_pay_method` tinyint DEFAULT 0,
  `order_total_price` float,
  `user_id` int,
  `vendor_id` int,
  `deliver_id` int,
  `order_deliver_number` varchar(200),
  `order_deliver_status` tinyint DEFAULT 0,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`deliver_id`) REFERENCES `deliver` (`deliver_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `order` (`user_id`, `vendor_id`, `order_item`) VALUES (1, 1, '{}');
INSERT INTO `order` (`user_id`, `vendor_id`, `order_item`) VALUES (1, 1, '{}');
INSERT INTO `order` (`user_id`, `vendor_id`, `order_item`) VALUES (1, 1, '{}');