/*
 Navicat Premium Dump SQL

 Source Server         : 天凌系统Api
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : localhost:3306
 Source Schema         : tianling_system

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 08/08/2024 10:26:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dict
-- ----------------------------
DROP TABLE IF EXISTS `dict`;
CREATE TABLE `dict`  (
  `dictId` int NOT NULL AUTO_INCREMENT COMMENT '字典Id',
  `dictName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典名称',
  `dictType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典类型',
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '字典状态',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`dictId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict
-- ----------------------------
INSERT INTO `dict` VALUES (1, '菜单状态', 'sys_show_hide', '2024-06-29 22:13:08.070785', '2024-07-01 17:32:19.000000', '1', '列表菜单状态');
INSERT INTO `dict` VALUES (9, '系统状态', 'monitor_loginLog_status', '2024-07-18 17:28:48.804000', '2024-07-18 17:28:48.804000', '1', '系统登录状态，系统操作状态');
INSERT INTO `dict` VALUES (10, '操作类型', 'sys_oper_type', '2024-07-24 20:17:44.552538', '2024-07-24 20:17:44.552538', '1', '操作类型，具体数据要与后端的操作类型对应起来。');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `parentId` int NOT NULL COMMENT '父级id',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单图标',
  `menuName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组件路径',
  `perms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限字符',
  `menuType` enum('M','C','F') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'M' COMMENT '菜单类型',
  `isLink` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '是否外链',
  `isCache` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '是否缓存',
  `visible` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '显示状态',
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '菜单状态',
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `sortNum` int NOT NULL COMMENT '显示排序',
  `iconType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单图标类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (4, 0, 'Tools', '系统管理', 'system', '', '', 'M', '0', '0', '1', '1', '2024-06-06 21:38:56.547000', 0, 'element');
INSERT INTO `menu` VALUES (6, 4, 'Menu', '菜单管理', 'menu', 'system/menu/index', '', 'C', '0', '0', '1', '1', '2024-06-07 11:25:34.782000', 2, '');
INSERT INTO `menu` VALUES (9, 4, 'UserFilled', '用户管理', 'user', 'system/user/index', '', 'C', '0', '0', '1', '1', '2024-06-11 15:02:28.789000', 0, '');
INSERT INTO `menu` VALUES (10, 4, 'icon-test', '角色管理', 'role', 'system/role/index', '', 'C', '0', '0', '1', '1', '2024-06-21 16:54:40.840000', 1, 'svg');
INSERT INTO `menu` VALUES (11, 6, '', '编辑', '', '', 'sys_menu_edit', 'F', '0', '0', '1', '1', '2024-06-26 22:54:36.592860', 0, '');
INSERT INTO `menu` VALUES (12, 4, 'Filter', '字典管理', 'dict', 'system/dict/index', '', 'C', '0', '0', '1', '1', '2024-06-29 15:51:08.491136', 3, '');
INSERT INTO `menu` VALUES (13, 6, '', '新增', '', '', 'sys_menu_add', 'F', '0', '0', '1', '1', '2024-07-15 20:36:19.805698', 1, '');
INSERT INTO `menu` VALUES (14, 6, '', '删除', '', '', 'sys_menu_delete', 'F', '0', '0', '1', '1', '2024-07-15 20:41:39.848758', 2, '');
INSERT INTO `menu` VALUES (15, 10, '', '修改', '', '', 'sys_role_edit', 'F', '0', '0', '1', '1', '2024-07-15 20:55:23.534772', 0, '');
INSERT INTO `menu` VALUES (16, 10, '', '新增', '', '', 'sys_role_add', 'F', '0', '0', '1', '1', '2024-07-15 20:56:41.911289', 1, '');
INSERT INTO `menu` VALUES (17, 10, '', '删除', '', '', 'sys_role_delete', 'F', '0', '0', '1', '1', '2024-07-15 20:56:59.630188', 2, '');
INSERT INTO `menu` VALUES (18, 10, '', '导出', '', '', 'sys_role_export', 'F', '0', '0', '1', '1', '2024-07-15 21:28:30.038927', 3, '');
INSERT INTO `menu` VALUES (19, 9, '', '修改', '', '', 'sys_user_edit', 'F', '0', '0', '1', '1', '2024-07-15 21:38:06.031708', 0, '');
INSERT INTO `menu` VALUES (20, 9, '', '新增', '', '', 'sys_user_add', 'F', '0', '0', '1', '1', '2024-07-15 21:40:18.896267', 1, '');
INSERT INTO `menu` VALUES (21, 9, '', '删除', '', '', 'sys_user_delete', 'F', '0', '0', '1', '1', '2024-07-15 21:43:57.838209', 2, '');
INSERT INTO `menu` VALUES (22, 9, '', '导出', '', '', 'sys_user_export', 'F', '0', '0', '1', '1', '2024-07-15 21:47:16.782712', 3, '');
INSERT INTO `menu` VALUES (23, 9, '', '导入', '', '', 'sys_user_import', 'F', '0', '0', '1', '1', '2024-07-15 21:48:26.554173', 4, '');
INSERT INTO `menu` VALUES (24, 9, '', '重置密码', '', '', 'sys_user_resetPwd', 'F', '0', '0', '1', '1', '2024-07-15 21:49:22.037421', 5, '');
INSERT INTO `menu` VALUES (25, 12, '', '修改', '', '', 'sys_dict_edit', 'F', '0', '0', '1', '1', '2024-07-15 22:00:54.543709', 0, '');
INSERT INTO `menu` VALUES (26, 12, '', '新增', '', '', 'sys_dict_add', 'F', '0', '0', '1', '1', '2024-07-15 22:01:58.497138', 1, '');
INSERT INTO `menu` VALUES (27, 12, '', '删除', '', '', 'sys_dict_delete', 'F', '0', '0', '1', '1', '2024-07-15 22:03:11.534040', 2, '');
INSERT INTO `menu` VALUES (28, 12, '', '查询', '', '', 'sys_dict_query', 'F', '0', '0', '1', '1', '2024-07-16 21:19:36.404727', 3, '');
INSERT INTO `menu` VALUES (29, 12, '', '导出', '', '', 'sys_dict_export', 'F', '0', '0', '1', '1', '2024-07-16 21:21:56.549048', 4, '');
INSERT INTO `menu` VALUES (30, 4, 'EditPen', '日志管理', 'log', '', '', 'M', '0', '0', '1', '1', '2024-07-17 19:35:38.095000', 4, '');
INSERT INTO `menu` VALUES (31, 30, '', '登录日志', 'loginlog', 'monitor/loginlog', 'monitor_loginLog_list', 'C', '0', '0', '1', '1', '2024-07-17 19:37:04.652000', 0, '');
INSERT INTO `menu` VALUES (32, 31, '', '删除', '', '', 'monitor_loginLog_delete', 'F', '0', '0', '1', '1', '2024-07-18 17:11:31.445535', 0, '');
INSERT INTO `menu` VALUES (33, 31, '', '导出', '', '', 'monitor_loginLog_export', 'F', '0', '0', '1', '1', '2024-07-23 10:52:35.573769', 1, '');
INSERT INTO `menu` VALUES (34, 31, '', '清空', '', '', 'monitor_loginLog_clear', 'F', '0', '0', '1', '1', '2024-07-23 10:53:00.851579', 2, '');
INSERT INTO `menu` VALUES (35, 30, '', '操作日志', 'operlog', 'monitor/operlog', 'monitor_operlog_list', 'C', '0', '0', '1', '1', '2024-07-23 10:59:52.584249', 1, '');
INSERT INTO `menu` VALUES (36, 35, '', '删除', '', '', 'monitor_operLog_delete', 'F', '0', '0', '1', '1', '2024-07-23 22:05:34.167432', 0, '');
INSERT INTO `menu` VALUES (37, 35, '', '清空', '', '', 'monitor_operLog_clear', 'F', '0', '0', '1', '1', '2024-07-23 22:06:08.570848', 1, '');
INSERT INTO `menu` VALUES (38, 35, '', '导出', '', '', 'monitor_operLog_export', 'F', '0', '0', '1', '1', '2024-07-23 22:07:19.861423', 2, '');
INSERT INTO `menu` VALUES (39, 0, 'DataLine', '系统监控', 'monitor', '', '', 'M', '0', '0', '1', '1', '2024-07-25 14:30:12.174000', 1, '');
INSERT INTO `menu` VALUES (40, 39, '', '在线用户', 'online', 'monitor/online', 'monitor_online_list', 'C', '0', '0', '1', '1', '2024-07-25 14:33:38.109216', 0, '');
INSERT INTO `menu` VALUES (41, 40, '', '强退', '', '', 'monitor_online_logout', 'F', '0', '0', '1', '1', '2024-07-25 21:19:29.448564', 0, '');
INSERT INTO `menu` VALUES (42, 0, 'Briefcase', '系统工具', 'tool', '', '', 'M', '0', '0', '1', '1', '2024-07-31 18:22:03.373377', 2, 'element');
INSERT INTO `menu` VALUES (43, 42, '', '系统接口（内嵌）', 'apifox', 'tool/apifox', '', 'C', '0', '0', '1', '1', '2024-07-31 18:23:20.051000', 0, '');
INSERT INTO `menu` VALUES (44, 42, '', '系统接口（外链）', 'https://tl-nest-admin.apifox.cn', '', '', 'C', '1', '0', '1', '1', '2024-07-31 18:34:51.993875', 1, '');
INSERT INTO `menu` VALUES (45, 0, 'Document', '组件封装', 'components', '', '', 'M', '0', '0', '1', '1', '2024-08-01 09:52:01.579386', 3, 'element');
INSERT INTO `menu` VALUES (46, 45, '', '图标选择器', 'iconSelect', 'demo/iconSelect', '', 'C', '0', '0', '1', '1', '2024-08-01 09:54:07.404249', 0, '');
INSERT INTO `menu` VALUES (47, 45, '', '上传组件', 'importUpload', 'demo/importUpload', '', 'C', '0', '0', '1', '1', '2024-08-02 15:47:17.642000', 1, '');
INSERT INTO `menu` VALUES (48, 45, '', '富文本编辑器', 'wangEditor', 'demo/wangEditor', '', 'C', '0', '0', '1', '1', '2024-08-02 18:11:41.770203', 2, '');

-- ----------------------------
-- Table structure for monitor_oper_log
-- ----------------------------
DROP TABLE IF EXISTS `monitor_oper_log`;
CREATE TABLE `monitor_oper_log`  (
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '模块标题',
  `operType` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作类型',
  `operName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作人员',
  `operMethod` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作方法',
  `operIp` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作地址',
  `operLocation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作地点',
  `operStatus` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作状态',
  `requestUrl` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求URL',
  `requestMethod` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求方式',
  `requestParam` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求参数',
  `requestResult` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求返回结果',
  `requestErrmsg` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求错误消息',
  `operId` int NOT NULL AUTO_INCREMENT COMMENT '日志编号',
  `costTime` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求耗时',
  PRIMARY KEY (`operId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of monitor_oper_log
-- ----------------------------
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 15:34:12.573486', '2024-07-24 15:34:12.573486', '清空操作日志', '10', 'admin', 'OperLogControlleroperLogClear()', '::1', '  ', '1', '/api/oper-log/clear', 'DELETE', '{}', '{\"status\":200,\"message\":\"清空成功\",\"success\":true}', NULL, 1, NULL);
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 16:06:04.003974', '2024-07-24 16:06:04.003974', '导出操作日志', '6', 'admin', 'OperLogControllerdownloadExcel()', '::1', '  ', '1', '/api/oper-log/excel/download?operIds=1', 'GET', '{}', '{\"data\":{\"type\":\"Buffer\",\"data\":[80,75,3,4,10,0,0,0,8,0,193,64,248,88,145,219,192,9,89,1,0,0,240,4,0,0,19,0,0,0,91,67,111,110,116,101,110,116,95,84,121,112,101,115,93,46,120,109,108,173,148,77,110,194,48,16,133,247,61,69,228,45,74,12,93,84,85,69,194,162,180,203,22,169,244,0,211,120,66,44,28,219,242,152,191,219,119,18,40,170,42,32,170,96,19,43,153,55,239,123,158,196,25,79,182,141,73,214,24,72,59,155,139,81,54,20,9,218,210,41,109,23,185,248,156,191,166,143,34,161,8,86,129,113,22,115,177,67,18,147,226,110,60,223,121,164,132,155,45,229,162,142,209,63,73,73,101,141,13,80,230,60,90,174,84,46,52,16,249,54,44,164,135,114,9,11,148,247,195,225,131,44,157,141,104,99,26,91,15,81,140,167,88,193,202,196,228,101,203,143,247,65,2,26,18,201,243,94,216,178,114,1,222,27,93,66,228,186,92,91,245,135,146,30,8,25,119,118,26,170,181,167,1,11,132,60,73,104,43,231,1,135,190,119,158,76,208,10,147,25,132,248,6,13,171,228,214,200,141,11,203,47,231,150,217,101,147,19,41,93,85,233,18,149,43,87,13,183,100,228,3,130,162,26,49,54,38,235,214,172,1,109,7,253,252,78,76,178,91,70,55,14,114,244,239,201,17,249,125,227,254,122,125,132,206,166,7,72,113,103,144,110,61,246,206,180,143,92,67,64,245,17,3,31,140,155,7,248,237,125,225,147,93,95,73,229,254,105,128,13,83,206,109,148,165,179,224,60,241,17,13,248,255,93,254,156,193,182,59,245,108,132,33,234,203,163,61,18,217,250,234,177,98,59,43,133,234,4,91,118,63,172,226,27,80,75,3,4,10,0,0,0,0,0,193,64,248,88,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,95,114,101,108,115,47,80,75,3,4,10,0,0,0,8,0,193,64,248,88,242,159,73,218,233,0,0,0,75,2,0,0,11,0,0,0,95,114,101,108,115,47,46,114,101,108,115,173,146,193,78,195,48,12,64,239,124,69,228,251,154,110,72,8,161,165,187,32,164,221,38,52,62,192,36,110,27,181,141,163,196,131,238,239,137,144,64,12,141,105,7,142,113,236,231,103,203,235,205,60,141,234,141,82,246,28,12,44,171,26,20,5,203,206,135,206,192,203,254,105,113,15,42,11,6,135,35,7,50,112,164,12,155,230,102,253,76,35,74,169,201,189,143,89,21,72,200,6,122,145,248,160,117,182,61,77,1', NULL, 2, NULL);
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 16:15:03.254621', '2024-07-24 16:15:03.254621', '修改用户', '3', 'admin', 'UserControllerupdate()', '::1', '  ', '1', '/api/user/update/39', 'PUT', '{\"userId\":39,\"nickName\":\"test\",\"phoneNumber\":\"\",\"email\":\"\",\"sex\":\"\",\"userName\":\"test\",\"status\":\"1\",\"avatar\":null,\"remark\":\"测试加密用户\",\"createDate\":\"2024-06-24T08:21:34.318Z\",\"updateDate\":\"2024-06-25T14:17:47.065Z\",\"roleIds\":2}', '{\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 3, NULL);
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:17:44.606748', '2024-07-24 20:17:44.606748', '新增字典', '2', 'admin', 'DictController.dictAdd()', '::1', '  ', '1', '/api/dict/add', 'POST', '{\"status\":\"1\",\"dictName\":\"操作类型\",\"dictType\":\"sys_oper_type\",\"remark\":\"操作类型，具体数据要与后端的操作类型对应起来。\",\"createDate\":\"2024-07-24T12:17:44.552Z\",\"updateDate\":\"2024-07-24T12:17:44.552Z\",\"dictId\":10}', '{\"data\":{\"status\":\"1\",\"dictName\":\"操作类型\",\"dictType\":\"sys_oper_type\",\"remark\":\"操作类型，具体数据要与后端的操作类型对应起来。\",\"createDate\":\"2024-07-24T12:17:44.552Z\",\"updateDate\":\"2024-07-24T12:17:44.552Z\",\"dictId\":10},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 4, '83毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:32:45.513312', '2024-07-24 20:32:45.513312', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":0,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"其它\",\"dictDataValue\":\"0\",\"cssClass\":\"default\",\"remark\":\"其它操作\",\"createDate\":\"2024-07-24T12:32:45.444Z\",\"updateDate\":\"2024-07-24T12:32:45.444Z\",\"dictDataId\":11}', '{\"data\":{\"sortNum\":0,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"其它\",\"dictDataValue\":\"0\",\"cssClass\":\"default\",\"remark\":\"其它操作\",\"createDate\":\"2024-07-24T12:32:45.444Z\",\"updateDate\":\"2024-07-24T12:32:45.444Z\",\"dictDataId\":11},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 5, '75毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:33:37.362429', '2024-07-24 20:33:37.362429', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":1,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"查询\",\"dictDataValue\":\"1\",\"cssClass\":\"default\",\"remark\":\"查询操作\",\"createDate\":\"2024-07-24T12:33:37.309Z\",\"updateDate\":\"2024-07-24T12:33:37.309Z\",\"dictDataId\":12}', '{\"data\":{\"sortNum\":1,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"查询\",\"dictDataValue\":\"1\",\"cssClass\":\"default\",\"remark\":\"查询操作\",\"createDate\":\"2024-07-24T12:33:37.309Z\",\"updateDate\":\"2024-07-24T12:33:37.309Z\",\"dictDataId\":12},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 6, '56毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:34:32.013491', '2024-07-24 20:34:32.013491', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":2,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"新增\",\"dictDataValue\":\"2\",\"cssClass\":\"primary\",\"remark\":\"新增操作\",\"createDate\":\"2024-07-24T12:34:31.977Z\",\"updateDate\":\"2024-07-24T12:34:31.977Z\",\"dictDataId\":13}', '{\"data\":{\"sortNum\":2,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"新增\",\"dictDataValue\":\"2\",\"cssClass\":\"primary\",\"remark\":\"新增操作\",\"createDate\":\"2024-07-24T12:34:31.977Z\",\"updateDate\":\"2024-07-24T12:34:31.977Z\",\"dictDataId\":13},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 7, '41毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:35:30.976205', '2024-07-24 20:35:30.976205', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":3,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"修改\",\"dictDataValue\":\"3\",\"cssClass\":\"success\",\"remark\":\"修改操作\",\"createDate\":\"2024-07-24T12:35:30.900Z\",\"updateDate\":\"2024-07-24T12:35:30.900Z\",\"dictDataId\":14}', '{\"data\":{\"sortNum\":3,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"修改\",\"dictDataValue\":\"3\",\"cssClass\":\"success\",\"remark\":\"修改操作\",\"createDate\":\"2024-07-24T12:35:30.900Z\",\"updateDate\":\"2024-07-24T12:35:30.900Z\",\"dictDataId\":14},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 8, '71毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:35:59.043672', '2024-07-24 20:35:59.043672', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":4,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"删除\",\"remark\":\"删除操作\",\"dictDataValue\":\"4\",\"cssClass\":\"danger\",\"createDate\":\"2024-07-24T12:35:58.978Z\",\"updateDate\":\"2024-07-24T12:35:58.978Z\",\"dictDataId\":15}', '{\"data\":{\"sortNum\":4,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"删除\",\"remark\":\"删除操作\",\"dictDataValue\":\"4\",\"cssClass\":\"danger\",\"createDate\":\"2024-07-24T12:35:58.978Z\",\"updateDate\":\"2024-07-24T12:35:58.978Z\",\"dictDataId\":15},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 9, '62毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:37:30.708501', '2024-07-24 20:37:30.708501', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":5,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"授权\",\"remark\":\"授权操作\",\"cssClass\":\"primary\",\"dictDataValue\":\"5\",\"createDate\":\"2024-07-24T12:37:30.650Z\",\"updateDate\":\"2024-07-24T12:37:30.650Z\",\"dictDataId\":16}', '{\"data\":{\"sortNum\":5,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"授权\",\"remark\":\"授权操作\",\"cssClass\":\"primary\",\"dictDataValue\":\"5\",\"createDate\":\"2024-07-24T12:37:30.650Z\",\"updateDate\":\"2024-07-24T12:37:30.650Z\",\"dictDataId\":16},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 10, '52毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:38:01.538527', '2024-07-24 20:38:01.538527', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":6,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"导出\",\"remark\":\"导出操作\",\"cssClass\":\"warning\",\"dictDataValue\":\"6\",\"createDate\":\"2024-07-24T12:38:01.473Z\",\"updateDate\":\"2024-07-24T12:38:01.473Z\",\"dictDataId\":17}', '{\"data\":{\"sortNum\":6,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"导出\",\"remark\":\"导出操作\",\"cssClass\":\"warning\",\"dictDataValue\":\"6\",\"createDate\":\"2024-07-24T12:38:01.473Z\",\"updateDate\":\"2024-07-24T12:38:01.473Z\",\"dictDataId\":17},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 11, '67毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:38:51.411741', '2024-07-24 20:38:51.411741', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":7,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"cssClass\":\"info\",\"dictDataLabel\":\"导入\",\"remark\":\"导入操作\",\"dictDataValue\":\"7\",\"createDate\":\"2024-07-24T12:38:51.343Z\",\"updateDate\":\"2024-07-24T12:38:51.343Z\",\"dictDataId\":18}', '{\"data\":{\"sortNum\":7,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"cssClass\":\"info\",\"dictDataLabel\":\"导入\",\"remark\":\"导入操作\",\"dictDataValue\":\"7\",\"createDate\":\"2024-07-24T12:38:51.343Z\",\"updateDate\":\"2024-07-24T12:38:51.343Z\",\"dictDataId\":18},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 12, '70毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:39:35.838847', '2024-07-24 20:39:35.838847', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":8,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"强退\",\"remark\":\"强退操作\",\"dictDataValue\":\"8\",\"createDate\":\"2024-07-24T12:39:35.789Z\",\"updateDate\":\"2024-07-24T12:39:35.789Z\",\"dictDataId\":19}', '{\"data\":{\"sortNum\":8,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"强退\",\"remark\":\"强退操作\",\"dictDataValue\":\"8\",\"createDate\":\"2024-07-24T12:39:35.789Z\",\"updateDate\":\"2024-07-24T12:39:35.789Z\",\"dictDataId\":19},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 13, '50毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:40:05.821411', '2024-07-24 20:40:05.821411', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":9,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"生成代码\",\"remark\":\"生成代码操作\",\"cssClass\":\"warning\",\"dictDataValue\":\"9\",\"createDate\":\"2024-07-24T12:40:05.754Z\",\"updateDate\":\"2024-07-24T12:40:05.754Z\",\"dictDataId\":20}', '{\"data\":{\"sortNum\":9,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"生成代码\",\"remark\":\"生成代码操作\",\"cssClass\":\"warning\",\"dictDataValue\":\"9\",\"createDate\":\"2024-07-24T12:40:05.754Z\",\"updateDate\":\"2024-07-24T12:40:05.754Z\",\"dictDataId\":20},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 14, '70毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:40:12.530871', '2024-07-24 20:40:12.530871', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '0', '/api/dict-data/update/19', 'PUT', '{\"createDate\":\"2024-07-24T12:39:35.789Z\",\"updateDate\":\"2024-07-24T12:39:35.789Z\",\"dictDataId\":19,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"强退\",\"dictDataValue\":\"8\",\"sortNum\":8,\"status\":\"1\",\"remark\":\"强退操作\",\"cssClass\":\"danger\"}', '{\"data\":null,\"status\":500,\"message\":\"Property \\\"cssClass\\\" was not found in \\\"DictData\\\". Make sure your query is correct.\",\"success\":false}', 'Property \"cssClass\" was not found in \"DictData\". Make sure your query is correct.', 15, '8毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:41:07.393590', '2024-07-24 20:41:07.393590', '新增字典数据', '2', 'admin', 'DictDataController.dictDataAdd()', '::1', '  ', '1', '/api/dict-data/add', 'POST', '{\"sortNum\":10,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"清空数据\",\"dictDataValue\":\"10\",\"remark\":\"清空数据操作\",\"cssClass\":\"danger\",\"createDate\":\"2024-07-24T12:41:07.340Z\",\"updateDate\":\"2024-07-24T12:41:07.340Z\",\"dictDataId\":21}', '{\"data\":{\"sortNum\":10,\"status\":\"1\",\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"清空数据\",\"dictDataValue\":\"10\",\"remark\":\"清空数据操作\",\"cssClass\":\"danger\",\"createDate\":\"2024-07-24T12:41:07.340Z\",\"updateDate\":\"2024-07-24T12:41:07.340Z\",\"dictDataId\":21},\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 16, '50毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:41:21.147021', '2024-07-24 20:41:21.147021', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/11', 'PUT', '{\"createDate\":\"2024-07-24T12:32:45.444Z\",\"updateDate\":\"2024-07-24T12:32:45.444Z\",\"dictDataId\":11,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"其它\",\"dictDataValue\":\"0\",\"sortNum\":11,\"status\":\"1\",\"remark\":\"其它操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 17, '60毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:45:59.753684', '2024-07-24 20:45:59.753684', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/12', 'PUT', '{\"createDate\":\"2024-07-24T12:33:37.309Z\",\"updateDate\":\"2024-07-24T12:33:37.309Z\",\"dictDataId\":12,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"查询\",\"dictDataValue\":\"1\",\"sortNum\":1,\"status\":\"1\",\"cssClass\":\"info\",\"remark\":\"查询操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 18, '55毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:11.125123', '2024-07-24 20:46:11.125123', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/13', 'PUT', '{\"createDate\":\"2024-07-24T12:34:31.977Z\",\"updateDate\":\"2024-07-24T12:34:31.977Z\",\"dictDataId\":13,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"新增\",\"dictDataValue\":\"2\",\"sortNum\":2,\"status\":\"1\",\"cssClass\":\"primary\",\"remark\":\"新增操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 19, '43毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:21.568628', '2024-07-24 20:46:21.568628', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/14', 'PUT', '{\"createDate\":\"2024-07-24T12:35:30.900Z\",\"updateDate\":\"2024-07-24T12:35:30.900Z\",\"dictDataId\":14,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"修改\",\"dictDataValue\":\"3\",\"sortNum\":3,\"status\":\"1\",\"cssClass\":\"success\",\"remark\":\"修改操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 20, '41毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:29.631822', '2024-07-24 20:46:29.631822', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/15', 'PUT', '{\"createDate\":\"2024-07-24T12:35:58.978Z\",\"updateDate\":\"2024-07-24T12:35:58.978Z\",\"dictDataId\":15,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"删除\",\"dictDataValue\":\"4\",\"sortNum\":4,\"status\":\"1\",\"cssClass\":\"danger\",\"remark\":\"删除操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 21, '51毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:35.782471', '2024-07-24 20:46:35.782471', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/16', 'PUT', '{\"createDate\":\"2024-07-24T12:37:30.650Z\",\"updateDate\":\"2024-07-24T12:37:30.650Z\",\"dictDataId\":16,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"授权\",\"dictDataValue\":\"5\",\"sortNum\":5,\"status\":\"1\",\"cssClass\":\"primary\",\"remark\":\"授权操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 22, '58毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:41.779036', '2024-07-24 20:46:41.779036', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/17', 'PUT', '{\"createDate\":\"2024-07-24T12:38:01.473Z\",\"updateDate\":\"2024-07-24T12:38:01.473Z\",\"dictDataId\":17,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"导出\",\"dictDataValue\":\"6\",\"sortNum\":6,\"status\":\"1\",\"cssClass\":\"warning\",\"remark\":\"导出操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 23, '41毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:46.689925', '2024-07-24 20:46:46.689925', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/18', 'PUT', '{\"createDate\":\"2024-07-24T12:38:51.343Z\",\"updateDate\":\"2024-07-24T12:38:51.343Z\",\"dictDataId\":18,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"导入\",\"dictDataValue\":\"7\",\"sortNum\":7,\"status\":\"1\",\"cssClass\":\"info\",\"remark\":\"导入操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 24, '42毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:53.140104', '2024-07-24 20:46:53.140104', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/19', 'PUT', '{\"createDate\":\"2024-07-24T12:39:35.789Z\",\"updateDate\":\"2024-07-24T12:39:35.789Z\",\"dictDataId\":19,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"强退\",\"dictDataValue\":\"8\",\"sortNum\":8,\"status\":\"1\",\"cssClass\":\"danger\",\"remark\":\"强退操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 25, '41毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:46:58.163723', '2024-07-24 20:46:58.163723', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/20', 'PUT', '{\"createDate\":\"2024-07-24T12:40:05.754Z\",\"updateDate\":\"2024-07-24T12:40:05.754Z\",\"dictDataId\":20,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"生成代码\",\"dictDataValue\":\"9\",\"sortNum\":9,\"status\":\"1\",\"cssClass\":\"warning\",\"remark\":\"生成代码操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 26, '43毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:47:03.115202', '2024-07-24 20:47:03.115202', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/21', 'PUT', '{\"createDate\":\"2024-07-24T12:41:07.340Z\",\"updateDate\":\"2024-07-24T12:41:07.340Z\",\"dictDataId\":21,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"清空数据\",\"dictDataValue\":\"10\",\"sortNum\":10,\"status\":\"1\",\"cssClass\":\"danger\",\"remark\":\"清空数据操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 27, '40毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-24 20:47:09.840018', '2024-07-24 20:47:09.840018', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/11', 'PUT', '{\"createDate\":\"2024-07-24T12:32:45.444Z\",\"updateDate\":\"2024-07-24T12:32:45.444Z\",\"dictDataId\":11,\"dictType\":\"sys_oper_type\",\"dictDataLabel\":\"其它\",\"dictDataValue\":\"0\",\"sortNum\":11,\"status\":\"1\",\"cssClass\":\"default\",\"remark\":\"其它操作\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 28, '41毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 13:53:22.057420', '2024-07-25 13:53:22.057420', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/7', 'PUT', '{\"createDate\":\"2024-07-01T12:34:56.097Z\",\"updateDate\":\"2024-07-01T12:34:56.097Z\",\"dictDataId\":7,\"dictType\":\"sys_show_hide\",\"dictDataLabel\":\"正常\",\"dictDataValue\":\"1\",\"sortNum\":0,\"status\":\"1\",\"cssClass\":\"success\",\"remark\":\"菜单状态正常\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 29, '55毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 13:53:29.841527', '2024-07-25 13:53:29.841527', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/8', 'PUT', '{\"createDate\":\"2024-07-01T12:35:17.921Z\",\"updateDate\":\"2024-07-01T12:35:17.921Z\",\"dictDataId\":8,\"dictType\":\"sys_show_hide\",\"dictDataLabel\":\"停用\",\"dictDataValue\":\"0\",\"sortNum\":1,\"status\":\"1\",\"cssClass\":\"danger\",\"remark\":\"菜单状态停用\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 30, '39毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 13:54:55.780077', '2024-07-25 13:54:55.780077', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/9', 'PUT', '{\"createDate\":\"2024-07-18T12:56:55.821Z\",\"updateDate\":\"2024-07-18T12:56:55.821Z\",\"dictDataId\":9,\"dictType\":\"monitor_loginLog_status\",\"dictDataLabel\":\"成功\",\"dictDataValue\":\"1\",\"sortNum\":0,\"status\":\"1\",\"cssClass\":\"success\",\"remark\":\"成功状态\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 31, '50毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 13:55:06.251232', '2024-07-25 13:55:06.251232', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/10', 'PUT', '{\"createDate\":\"2024-07-18T12:58:25.226Z\",\"updateDate\":\"2024-07-18T12:58:25.226Z\",\"dictDataId\":10,\"dictType\":\"monitor_loginLog_status\",\"dictDataLabel\":\"失败\",\"dictDataValue\":\"0\",\"sortNum\":1,\"status\":\"1\",\"cssClass\":\"danger\",\"remark\":\"失败\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 32, '48毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 13:58:06.911793', '2024-07-25 13:58:06.911793', '修改字典数据', '3', 'admin', 'DictDataController.updateDictData()', '::1', '  ', '1', '/api/dict-data/update/10', 'PUT', '{\"createDate\":\"2024-07-18T12:58:25.226Z\",\"updateDate\":\"2024-07-18T12:58:25.226Z\",\"dictDataId\":10,\"dictType\":\"monitor_loginLog_status\",\"dictDataLabel\":\"失败\",\"dictDataValue\":\"0\",\"sortNum\":1,\"status\":\"1\",\"cssClass\":\"danger\",\"remark\":\"失败状态\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 33, '42毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 13:58:47.335500', '2024-07-25 13:58:47.335500', '修改字典', '3', 'admin', 'DictController.update()', '::1', '  ', '1', '/api/dict/update/9', 'PUT', '{\"createDate\":\"2024-07-18T09:28:48.804Z\",\"updateDate\":\"2024-07-18T09:28:48.804Z\",\"dictId\":9,\"dictName\":\"系统状态\",\"dictType\":\"monitor_loginLog_status\",\"status\":\"1\",\"remark\":\"系统登录状态，系统操作状态\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 34, '39毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 14:30:12.221233', '2024-07-25 14:30:12.221233', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":0,\"menuType\":\"M\",\"icon\":\"DataLine\",\"menuName\":\"系统监控\",\"sortNum\":2,\"isLink\":\"0\",\"path\":\"monitor\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 35, '46毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 14:30:25.273508', '2024-07-25 14:30:25.273508', '修改菜单', '3', 'admin', 'MenuController.update()', '::1', '  ', '1', '/api/menu/39', 'PATCH', '{\"id\":39,\"parentId\":0,\"menuType\":\"M\",\"icon\":\"DataLine\",\"menuName\":\"系统监控\",\"sortNum\":1,\"isLink\":\"0\",\"path\":\"monitor\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\",\"createDate\":\"2024-07-25T06:30:12.174Z\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 36, '57毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 14:33:38.152667', '2024-07-25 14:33:38.152667', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":39,\"menuType\":\"C\",\"icon\":\"\",\"menuName\":\"在线用户\",\"sortNum\":0,\"isLink\":\"0\",\"path\":\"online\",\"component\":\"monitor/online\",\"perms\":\"monitor_online_list\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 37, '42毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-25 21:19:29.514993', '2024-07-25 21:19:29.514993', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":40,\"menuType\":\"F\",\"icon\":\"\",\"menuName\":\"强退\",\"sortNum\":0,\"isLink\":\"0\",\"path\":\"\",\"component\":\"\",\"perms\":\"monitor_online_logout\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 38, '71毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-26 15:23:29.445740', '2024-07-26 15:23:29.445740', '修改菜单', '3', 'admin', 'MenuController.update()', '::1', '  ', '1', '/api/menu/30', 'PATCH', '{\"id\":30,\"parentId\":4,\"menuType\":\"M\",\"icon\":\"EditPen\",\"menuName\":\"日志管理\",\"sortNum\":4,\"isLink\":\"0\",\"path\":\"log\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\",\"createDate\":\"2024-07-17T11:35:38.095Z\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 39, '493毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-29 20:43:39.349632', '2024-07-29 20:43:39.349632', '修改菜单', '3', 'admin', 'MenuController.update()', '::1', '  ', '1', '/api/menu/4', 'PATCH', '{\"id\":4,\"parentId\":0,\"menuType\":\"M\",\"icon\":\"Tools\",\"iconType\":\"element\",\"menuName\":\"系统管理\",\"sortNum\":0,\"isLink\":\"0\",\"path\":\"system\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\",\"createDate\":\"2024-06-06T13:38:56.547Z\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 40, '132毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-29 21:29:43.428566', '2024-07-29 21:29:43.428566', '修改菜单', '3', 'admin', 'MenuController.update()', '::1', '  ', '1', '/api/menu/10', 'PATCH', '{\"id\":10,\"parentId\":4,\"menuType\":\"C\",\"icon\":\"icon-test\",\"iconType\":\"svg\",\"menuName\":\"角色管理\",\"sortNum\":1,\"isLink\":\"0\",\"path\":\"role\",\"component\":\"system/role/index\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\",\"createDate\":\"2024-06-21T08:54:40.840Z\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 41, '95毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 09:56:52.730834', '2024-07-31 09:56:52.730834', '修改用户', '3', 'admin', 'UserController.update()', '::1', '  ', '0', '/api/user/update/39', 'PUT', '{\"userId\":39,\"status\":\"0\"}', '{\"data\":null,\"status\":500,\"message\":\"修改用户undefined失败，用户名称已存在\",\"success\":true}', '修改用户undefined失败，用户名称已存在', 42, '2毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:02:57.660015', '2024-07-31 10:02:57.660015', '修改用户', '3', 'admin', 'UserController.update()', '::1', '  ', '0', '/api/user/update/39', 'PUT', '{\"userId\":39,\"status\":\"0\"}', '{\"data\":null,\"status\":500,\"message\":\"修改用户undefined失败，用户名称已存在\",\"success\":true}', '修改用户undefined失败，用户名称已存在', 43, '27953毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:08:21.978398', '2024-07-31 10:08:21.978398', '修改用户', '3', 'admin', 'UserController.update()', '::1', '  ', '1', '/api/user/update/39', 'PUT', '{\"userId\":39,\"status\":\"1\"}', '{\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 44, '39048毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:08:57.075323', '2024-07-31 10:08:57.075323', '修改用户', '3', 'admin', 'UserController.update()', '::1', '  ', '1', '/api/user/update/39', 'PUT', '{\"userId\":39,\"status\":\"0\"}', '{\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 45, '64毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:08:58.837887', '2024-07-31 10:08:58.837887', '修改用户', '3', 'admin', 'UserController.update()', '::1', '  ', '1', '/api/user/update/39', 'PUT', '{\"userId\":39,\"status\":\"1\"}', '{\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 46, '41毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:13:47.487590', '2024-07-31 10:13:47.487590', '新增用户', '2', 'admin', 'UserController.create()', '::1', '  ', '1', '/api/user', 'POST', '{\"status\":\"1\",\"userName\":\"111\",\"password\":\"1111111\",\"nickName\":\"111\"}', '{\"status\":200,\"message\":\"新增成功\",\"success\":true}', NULL, 47, '169毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:13:55.191850', '2024-07-31 10:13:55.191850', '删除用户', '4', 'admin', 'UserController.remove()', '::1', '  ', '1', '/api/user/41', 'DELETE', '{}', '{\"data\":{\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"删除成功\",\"success\":true}', NULL, 48, '98毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:17:05.441853', '2024-07-31 10:17:05.441853', '导出用户', '6', 'admin', 'UserController.downloadExcel()', '::1', '  ', '1', '/api/user/excel/download?userIds=39', 'GET', '{}', '{\"data\":{\"type\":\"Buffer\",\"data\":[80,75,3,4,10,0,0,0,8,0,34,18,255,88,145,219,192,9,89,1,0,0,240,4,0,0,19,0,0,0,91,67,111,110,116,101,110,116,95,84,121,112,101,115,93,46,120,109,108,173,148,77,110,194,48,16,133,247,61,69,228,45,74,12,93,84,85,69,194,162,180,203,22,169,244,0,211,120,66,44,28,219,242,152,191,219,119,18,40,170,42,32,170,96,19,43,153,55,239,123,158,196,25,79,182,141,73,214,24,72,59,155,139,81,54,20,9,218,210,41,109,23,185,248,156,191,166,143,34,161,8,86,129,113,22,115,177,67,18,147,226,110,60,223,121,164,132,155,45,229,162,142,209,63,73,73,101,141,13,80,230,60,90,174,84,46,52,16,249,54,44,164,135,114,9,11,148,247,195,225,131,44,157,141,104,99,26,91,15,81,140,167,88,193,202,196,228,101,203,143,247,65,2,26,18,201,243,94,216,178,114,1,222,27,93,66,228,186,92,91,245,135,146,30,8,25,119,118,26,170,181,167,1,11,132,60,73,104,43,231,1,135,190,119,158,76,208,10,147,25,132,248,6,13,171,228,214,200,141,11,203,47,231,150,217,101,147,19,41,93,85,233,18,149,43,87,13,183,100,228,3,130,162,26,49,54,38,235,214,172,1,109,7,253,252,78,76,178,91,70,55,14,114,244,239,201,17,249,125,227,254,122,125,132,206,166,7,72,113,103,144,110,61,246,206,180,143,92,67,64,245,17,3,31,140,155,7,248,237,125,225,147,93,95,73,229,254,105,128,13,83,206,109,148,165,179,224,60,241,17,13,248,255,93,254,156,193,182,59,245,108,132,33,234,203,163,61,18,217,250,234,177,98,59,43,133,234,4,91,118,63,172,226,27,80,75,3,4,10,0,0,0,0,0,34,18,255,88,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,95,114,101,108,115,47,80,75,3,4,10,0,0,0,8,0,34,18,255,88,242,159,73,218,233,0,0,0,75,2,0,0,11,0,0,0,95,114,101,108,115,47,46,114,101,108,115,173,146,193,78,195,48,12,64,239,124,69,228,251,154,110,72,8,161,165,187,32,164,221,38,52,62,192,36,110,27,181,141,163,196,131,238,239,137,144,64,12,141,105,7,142,113,236,231,103,203,235,205,60,141,234,141,82,246,28,12,44,171,26,20,5,203,206,135,206,192,203,254,105,113,15,42,11,6,135,35,7,50,112,164,12,155,230,102,253,76,35,74,169,201,189,143,89,21,72,200,6,122,145,248,160,117,182,61,77,152,', NULL, 49, '54毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:30:17.837222', '2024-07-31 10:30:17.837222', '修改个人基本信息', '3', 'admin', 'ProfileController.updateUserInfo()', '::1', '  ', '1', '/api/profile/updateUserInfo', 'PUT', '{\"userId\":1,\"nickName\":\"陆天凌\",\"phoneNumber\":\"13333335555\",\"email\":\"123456@QQ.COM\",\"sex\":\"1\",\"userName\":\"admin\",\"status\":\"1\",\"avatar\":\"/images/avatar1720145818813.jpeg\",\"remark\":\"超级管理员\",\"createDate\":\"2024-06-12T12:31:01.286Z\",\"updateDate\":\"2024-07-05T02:16:58.000Z\",\"roles\":{\"createDate\":\"2024-06-22T14:39:04.017Z\",\"updateDate\":\"2024-06-24T03:23:04.140Z\",\"roleId\":1,\"roleName\":\"超级管理员\",\"roleKey\":\"admin\",\"roleSort\":0,\"status\":\"1\",\"remark\":\"超级管理员\"}}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 50, '5毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 10:49:48.089173', '2024-07-31 10:49:48.089173', '修改角色', '3', 'admin', 'RoleController.update()', '::1', '  ', '1', '/api/role/update/2', 'PUT', '{\"createDate\":\"2024-06-24T02:11:39.826Z\",\"updateDate\":\"2024-06-24T07:55:58.000Z\",\"roleId\":2,\"roleName\":\"普通角色\",\"roleKey\":\"common\",\"roleSort\":1,\"status\":\"1\",\"remark\":\"普通角色\",\"menuIds\":[4,6]}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 51, '100毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 18:20:11.452373', '2024-07-31 18:20:11.452373', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '0', '/api/menu', 'POST', '{\"parentId\":0,\"menuType\":\"M\",\"icon\":\"Briefcase\",\"iconType\":\"element\",\"menuName\":\"系统工具\",\"sortNum\":2,\"isLink\":\"0\",\"path\":\"tool\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"data\":null,\"status\":500,\"message\":\"Field \'iconType\' doesn\'t have a default value\",\"success\":false}', 'Field \'iconType\' doesn\'t have a default value', 52, '36毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 18:22:03.456721', '2024-07-31 18:22:03.456721', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":0,\"menuType\":\"M\",\"icon\":\"Briefcase\",\"iconType\":\"element\",\"menuName\":\"系统工具\",\"sortNum\":2,\"isLink\":\"0\",\"path\":\"tool\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 53, '83毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 18:23:20.106119', '2024-07-31 18:23:20.106119', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":42,\"menuType\":\"C\",\"icon\":\"\",\"iconType\":\"\",\"menuName\":\"系统接口\",\"sortNum\":0,\"isLink\":\"0\",\"path\":\"apifox\",\"component\":\"tool/apifox\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 54, '55毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 18:34:05.767657', '2024-07-31 18:34:05.767657', '修改菜单', '3', 'admin', 'MenuController.update()', '::1', '  ', '1', '/api/menu/43', 'PATCH', '{\"id\":43,\"parentId\":42,\"menuType\":\"C\",\"icon\":\"\",\"iconType\":\"\",\"menuName\":\"系统接口（内嵌）\",\"sortNum\":0,\"isLink\":\"0\",\"path\":\"apifox\",\"component\":\"tool/apifox\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\",\"createDate\":\"2024-07-31T10:23:20.051Z\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 55, '65毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-07-31 18:34:52.057591', '2024-07-31 18:34:52.057591', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":42,\"menuType\":\"C\",\"icon\":\"\",\"iconType\":\"\",\"menuName\":\"系统接口（外链）\",\"sortNum\":1,\"isLink\":\"1\",\"path\":\"https://tl-nest-admin.apifox.cn\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 56, '64毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-08-01 09:52:01.661667', '2024-08-01 09:52:01.661667', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":0,\"menuType\":\"M\",\"icon\":\"Document\",\"iconType\":\"element\",\"menuName\":\"组件封装\",\"sortNum\":3,\"isLink\":\"0\",\"path\":\"components\",\"component\":\"\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 57, '72毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-08-01 09:54:07.459531', '2024-08-01 09:54:07.459531', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":45,\"menuType\":\"C\",\"icon\":\"\",\"iconType\":\"\",\"menuName\":\"图标选择器\",\"sortNum\":0,\"isLink\":\"0\",\"path\":\"iconSelect\",\"component\":\"demo/iconSelect\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 58, '54毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-08-02 15:47:17.908885', '2024-08-02 15:47:17.908885', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":45,\"menuType\":\"C\",\"icon\":\"\",\"iconType\":\"\",\"menuName\":\"导入组件\",\"sortNum\":1,\"isLink\":\"0\",\"path\":\"importUpload\",\"component\":\"demo/importUpload\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 59, '274毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-08-02 17:43:45.522011', '2024-08-02 17:43:45.522011', '修改菜单', '3', 'admin', 'MenuController.update()', '::1', '  ', '1', '/api/menu/47', 'PATCH', '{\"id\":47,\"parentId\":45,\"menuType\":\"C\",\"icon\":\"\",\"iconType\":\"\",\"menuName\":\"上传组件\",\"sortNum\":1,\"isLink\":\"0\",\"path\":\"importUpload\",\"component\":\"demo/importUpload\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\",\"createDate\":\"2024-08-02T07:47:17.642Z\"}', '{\"data\":{\"generatedMaps\":[],\"raw\":[],\"affected\":1},\"status\":200,\"message\":\"修改成功\",\"success\":true}', NULL, 60, '121毫秒');
INSERT INTO `monitor_oper_log` VALUES ('2024-08-02 18:11:41.809791', '2024-08-02 18:11:41.809791', '新增菜单', '2', 'admin', 'MenuController.create()', '::1', '  ', '1', '/api/menu', 'POST', '{\"parentId\":45,\"menuType\":\"C\",\"icon\":\"\",\"iconType\":\"\",\"menuName\":\"富文本编辑器\",\"sortNum\":2,\"isLink\":\"0\",\"path\":\"wangEditor\",\"component\":\"demo/wangEditor\",\"perms\":\"\",\"isCache\":\"0\",\"visible\":\"1\",\"status\":\"1\"}', '{\"status\":200,\"message\":\"操作成功\",\"success\":true}', NULL, 61, '39毫秒');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '用户状态',
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `roleKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限字符',
  `roleSort` int NOT NULL COMMENT '角色顺序',
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '备注',
  PRIMARY KEY (`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '2024-06-22 22:39:04.017209', 1, '超级管理员', 'admin', 0, '2024-06-24 11:23:04.140997', '超级管理员');
INSERT INTO `role` VALUES ('1', '2024-06-24 10:11:39.826000', 2, '普通角色', 'common', 1, '2024-06-24 15:55:58.000000', '普通角色');

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `dictDataId` int NOT NULL AUTO_INCREMENT,
  `dictDataLabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典标签',
  `dictDataValue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典键值',
  `sortNum` int NOT NULL COMMENT '字典顺序',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '备注',
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '字典状态',
  `dictType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典类型',
  `cssClass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '回显样式',
  PRIMARY KEY (`dictDataId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES ('2024-07-01 20:34:56.097000', '2024-07-01 20:34:56.097000', 7, '正常', '1', 0, '菜单状态正常', '1', 'sys_show_hide', 'success');
INSERT INTO `sys_dict_data` VALUES ('2024-07-01 20:35:17.921000', '2024-07-01 20:35:17.921000', 8, '停用', '0', 1, '菜单状态停用', '1', 'sys_show_hide', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2024-07-18 20:56:55.821000', '2024-07-18 20:56:55.821000', 9, '成功', '1', 0, '成功状态', '1', 'monitor_loginLog_status', 'success');
INSERT INTO `sys_dict_data` VALUES ('2024-07-18 20:58:25.226000', '2024-07-18 20:58:25.226000', 10, '失败', '0', 1, '失败状态', '1', 'monitor_loginLog_status', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:32:45.444000', '2024-07-24 20:32:45.444000', 11, '其它', '0', 11, '其它操作', '1', 'sys_oper_type', 'default');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:33:37.309000', '2024-07-24 20:33:37.309000', 12, '查询', '1', 1, '查询操作', '1', 'sys_oper_type', 'info');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:34:31.977000', '2024-07-24 20:34:31.977000', 13, '新增', '2', 2, '新增操作', '1', 'sys_oper_type', 'primary');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:35:30.900000', '2024-07-24 20:35:30.900000', 14, '修改', '3', 3, '修改操作', '1', 'sys_oper_type', 'success');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:35:58.978000', '2024-07-24 20:35:58.978000', 15, '删除', '4', 4, '删除操作', '1', 'sys_oper_type', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:37:30.650000', '2024-07-24 20:37:30.650000', 16, '授权', '5', 5, '授权操作', '1', 'sys_oper_type', 'primary');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:38:01.473000', '2024-07-24 20:38:01.473000', 17, '导出', '6', 6, '导出操作', '1', 'sys_oper_type', 'warning');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:38:51.343000', '2024-07-24 20:38:51.343000', 18, '导入', '7', 7, '导入操作', '1', 'sys_oper_type', 'info');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:39:35.789000', '2024-07-24 20:39:35.789000', 19, '强退', '8', 8, '强退操作', '1', 'sys_oper_type', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:40:05.754000', '2024-07-24 20:40:05.754000', 20, '生成代码', '9', 9, '生成代码操作', '1', 'sys_oper_type', 'warning');
INSERT INTO `sys_dict_data` VALUES ('2024-07-24 20:41:07.340000', '2024-07-24 20:41:07.340000', 21, '清空数据', '10', 10, '清空数据操作', '1', 'sys_oper_type', 'danger');

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log`  (
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `loginName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户账号',
  `loginStatus` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '登录状态',
  `loginIp` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'IP地址',
  `loginLocation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '登录地点',
  `loginMessage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作信息',
  `userAgent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户代理',
  `browser` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '浏览器',
  `os` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作系统',
  `loginId` int NOT NULL AUTO_INCREMENT COMMENT '登录ID',
  PRIMARY KEY (`loginId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------
INSERT INTO `sys_login_log` VALUES ('2024-07-23 10:55:11.370711', '2024-07-23 10:55:11.370711', 'admin', '0', '::1', '', '验证码错误或未获取', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Chrome/126.0.0.0', 'Windows/10', 1);
INSERT INTO `sys_login_log` VALUES ('2024-07-23 10:55:15.773728', '2024-07-23 10:55:15.773728', 'admin', '1', '::1', '', '登录成功', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Chrome/126.0.0.0', 'Windows/10', 2);
INSERT INTO `sys_login_log` VALUES ('2024-07-25 16:11:34.733299', '2024-07-25 16:11:34.733299', 'admin', '1', '::1', '', '登录成功', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Chrome/126.0.0.0', 'Windows/10', 3);
INSERT INTO `sys_login_log` VALUES ('2024-07-25 16:20:55.283704', '2024-07-25 16:20:55.283704', 'test', '0', '::1', '', '用户名或密码错误', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0', 'Edge/120.0.0.0', 'Windows/10', 4);
INSERT INTO `sys_login_log` VALUES ('2024-07-25 16:21:01.799558', '2024-07-25 16:21:01.799558', 'test', '0', '::1', '', '用户名或密码错误', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0', 'Edge/120.0.0.0', 'Windows/10', 5);
INSERT INTO `sys_login_log` VALUES ('2024-07-25 16:21:37.740322', '2024-07-25 16:21:37.740322', 'test', '1', '::1', '', '登录成功', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0', 'Edge/120.0.0.0', 'Windows/10', 6);
INSERT INTO `sys_login_log` VALUES ('2024-07-25 21:06:35.070491', '2024-07-25 21:06:35.070491', 'admin', '1', '::1', '', '登录成功', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Chrome/126.0.0.0', 'Windows/10', 7);
INSERT INTO `sys_login_log` VALUES ('2024-07-29 22:15:45.860175', '2024-07-29 22:15:45.860175', 'admin', '0', '::1', '', '验证码错误或未获取', 'Apifox/1.0.0 (https://apifox.com)', 'undefined/undefined', 'undefined/undefined', 8);
INSERT INTO `sys_login_log` VALUES ('2024-07-29 22:26:50.011977', '2024-07-29 22:26:50.011977', 'admin', '1', '::1', '', '登录成功', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Chrome/126.0.0.0', 'Windows/10', 9);
INSERT INTO `sys_login_log` VALUES ('2024-07-31 09:21:34.356324', '2024-07-31 09:21:34.356324', 'admin', '1', '::1', '', '登录成功', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Chrome/126.0.0.0', 'Windows/10', 10);
INSERT INTO `sys_login_log` VALUES ('2024-08-07 14:24:00.277484', '2024-08-07 14:24:00.277484', 'admin', '1', '::1', '', '登录成功', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Chrome/126.0.0.0', 'Windows/10', 11);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `roleId` int NOT NULL COMMENT '角色ID',
  `menuId` int NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`roleId`, `menuId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('2024-06-22 22:39:04.022112', '2024-06-22 22:39:04.022112', 1, 4);
INSERT INTO `sys_role_menu` VALUES ('2024-06-22 22:39:04.022112', '2024-06-22 22:39:04.022112', 1, 6);
INSERT INTO `sys_role_menu` VALUES ('2024-06-22 22:39:04.022112', '2024-06-22 22:39:04.022112', 1, 9);
INSERT INTO `sys_role_menu` VALUES ('2024-06-22 22:39:04.022112', '2024-06-22 22:39:04.022112', 1, 10);
INSERT INTO `sys_role_menu` VALUES ('2024-07-31 10:49:48.007420', '2024-07-31 10:49:48.007420', 2, 4);
INSERT INTO `sys_role_menu` VALUES ('2024-07-31 10:49:48.007420', '2024-07-31 10:49:48.007420', 2, 6);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `userId` int NOT NULL COMMENT '用户ID',
  `roleIds` int NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`userId`, `roleIds`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名称',
  `phoneNumber` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '手机号码',
  `nickName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户昵称',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `sex` enum('0','1','') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '用户性别',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '用户状态',
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '备注',
  `userId` int NOT NULL AUTO_INCREMENT,
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像地址',
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '13333335555', '陆天凌', '123456@QQ.COM', '1', '$2b$10$tUSxEd71PQh6OsIACNCCiuFeBeqUv4UNeDv1N3IYtXWqNMJ7vUX7e', '1', '2024-06-12 20:31:01.286000', '超级管理员', 1, '2024-07-05 10:16:58.000000', '/images/avatar1720145818813.jpeg');
INSERT INTO `user` VALUES ('test', '', 'test', '', '', '$2b$10$6UnAeINIfni6/1V45DHiReqbCA4XlXqgbC7lcz01wyfyrk.HMulUq', '1', '2024-06-24 16:21:34.318000', '测试加密用户', 39, '2024-07-31 10:08:58.795000', NULL);

SET FOREIGN_KEY_CHECKS = 1;
