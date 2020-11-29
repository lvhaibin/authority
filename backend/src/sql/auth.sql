-- user 用户
CREATE TABLE `user`(
   `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
   `username` varchar(255) DEFAULT NULL COMMENT '管理员名',
   `password` varchar(255) DEFAULT NULL COMMENT '密码',
   `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
   `phone` varchar(255) DEFAULT NULL COMMENT '手机号码',
   `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
   `status` int(1) DEFAULT '1' COMMENT '0: 无效,1:有效',
   `isAdmin` int(1) DEFAULT '1' COMMENT '0:超级管理员,1:普通管理员',
   `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
   `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
   PRIMARY KEY(`id`),
   UNIQUE KEY`username`(`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COMMENT = '管理员表';

-- permission 访问权限
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '路由id',
  `type` int(1) DEFAULT '1' COMMENT '节点类型,1:表示模块 2:表示菜单3:操作',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `name` varchar(255) DEFAULT NULL COMMENT '路由名',
  `status` int(1) DEFAULT '1' COMMENT '0:无效,1:有效',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  `permissionId` int(11) DEFAULT NULL COMMENT '自关联id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COMMENT='路由表';

-- role 角色
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `title` varchar(255) DEFAULT NULL COMMENT '角色标题',
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `status` int(1) DEFAULT '1' COMMENT '0:无效,1:有效',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- user_role 用户和角色之间的映射关系
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户角色关系id',
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `roleId` int(11) DEFAULT NULL COMMENT '角色id',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- role_permission 角色和权限之间的映射
CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色权限id',
  `roleId` int(11) DEFAULT NULL COMMENT '角色id',
  `permissionId` int(11) DEFAULT NULL COMMENT '权限id',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=559 DEFAULT CHARSET=utf8mb4 COMMENT='角色权限多对多';
