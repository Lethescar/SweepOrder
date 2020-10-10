set names utf8;
DROP database if exists drink;
create database drink charset=utf8;
use drink;

# 商品列表
create table goodslist(
    id int primary key auto_increment,
    glid int,
    gldescribe varchar(128),
    img varchar(128),
    itemid int,
    oriprice varchar(16),
    price varchar(16),
    sold int,
    title varchar(16),
    typeid int
);
insert into goodslist values(null,10001,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',1,'￥12.00',10.00,45,'茉香奶绿',1001);
insert into goodslist values(null,10002,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',2,'￥12.00',10.00,45,'茉香奶绿',1001);
insert into goodslist values(null,10003,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',3,'￥12.00',10.00,45,'茉香奶绿',1001);
insert into goodslist values(null,10004,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',4,'￥12.00',10.00,45,'茉香奶绿',1001);
insert into goodslist values(null,10005,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',5,'￥12.00',10.00,45,'茉香奶绿',1001);
insert into goodslist values(null,10006,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',6,'￥12.00',10.00,45,'茉香奶绿',1001);
insert into goodslist values(null,10007,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',7,'￥12.00',10.00,45,'茉香奶绿',1001);
insert into goodslist values(null,10008,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist02.png',8,'￥12.00',12.00,30,'薄荷奶绿',1002);
insert into goodslist values(null,10009,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist02.png',9,'￥12.00',12.00,30,'薄荷奶绿',1002);
insert into goodslist values(null,10010,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist02.png',10,'￥12.00',12.00,30,'薄荷奶绿',1002);
insert into goodslist values(null,10011,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist02.png',11,'￥12.00',12.00,30,'薄荷奶绿',1002);
insert into goodslist values(null,10200,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist01.png',200,'￥12.00',10.00,45,'茉香奶绿',1200);
insert into goodslist values(null,10201,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist02.png',201,'￥12.00',12.00,30,'薄荷奶绿',1200);
insert into goodslist values(null,10202,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist03.png',202,'￥12.00',12.00,35,'寒天芒芒',1200);
insert into goodslist values(null,10203,'清新淡雅的茉莉花香绿茶与浓醇奶香融合，入口丝滑醇厚，唇齿留香！','/images/menulist04.png',203,'￥12.00',12.00,20,'鲜柠竹蔗汁',1200);

# 详情页轮播图
create table imgarray(
    id int primary key auto_increment,
    iaid int,
    img varchar(128)
);
insert into imgarray values(null,1,'/images/menulist01.png');
insert into imgarray values(null,1,'/images/menulist01.png');
insert into imgarray values(null,2,'/images/menulist01.png');
insert into imgarray values(null,2,'/images/menulist01.png');
insert into imgarray values(null,3,'/images/menulist01.png');
insert into imgarray values(null,3,'/images/menulist01.png');
insert into imgarray values(null,4,'/images/menulist01.png');
insert into imgarray values(null,4,'/images/menulist01.png');
insert into imgarray values(null,5,'/images/menulist01.png');
insert into imgarray values(null,5,'/images/menulist01.png');
insert into imgarray values(null,6,'/images/menulist01.png');
insert into imgarray values(null,6,'/images/menulist01.png');
insert into imgarray values(null,7,'/images/menulist01.png');
insert into imgarray values(null,7,'/images/menulist01.png');
insert into imgarray values(null,8,'/images/menulist02.png');
insert into imgarray values(null,8,'/images/menulist02.png');
insert into imgarray values(null,9,'/images/menulist02.png');
insert into imgarray values(null,9,'/images/menulist02.png');
insert into imgarray values(null,10,'/images/menulist02.png');
insert into imgarray values(null,10,'/images/menulist02.png');
insert into imgarray values(null,11,'/images/menulist02.png');
insert into imgarray values(null,11,'/images/menulist02.png');
insert into imgarray values(null,200,'/images/menulist01.png');
insert into imgarray values(null,200,'/images/menulist01.png');
insert into imgarray values(null,201,'/images/menulist02.png');
insert into imgarray values(null,201,'/images/menulist02.png');
insert into imgarray values(null,202,'/images/menulist03.png');
insert into imgarray values(null,202,'/images/menulist03.png');
insert into imgarray values(null,203,'/images/menulist04.png');
insert into imgarray values(null,203,'/images/menulist04.png');

# 商品详情页规格
create table sizelist(
    id int primary key auto_increment,
    slid int,
    activeid int,
    price varchar(16),
    sizeInfo varchar(8)
);
insert into sizelist values(null,1,1,10.00,'小杯');
insert into sizelist values(null,1,2,14.00,'中杯');
insert into sizelist values(null,1,3,15.00,'大杯');
insert into sizelist values(null,2,1,10.00,'小杯');
insert into sizelist values(null,2,2,14.00,'中杯');
insert into sizelist values(null,2,3,15.00,'大杯');
insert into sizelist values(null,3,1,10.00,'小杯');
insert into sizelist values(null,3,2,14.00,'中杯');
insert into sizelist values(null,3,3,15.00,'大杯');
insert into sizelist values(null,4,1,10.00,'小杯');
insert into sizelist values(null,4,2,14.00,'中杯');
insert into sizelist values(null,4,3,15.00,'大杯');
insert into sizelist values(null,5,1,10.00,'小杯');
insert into sizelist values(null,5,2,14.00,'中杯');
insert into sizelist values(null,5,3,15.00,'大杯');
insert into sizelist values(null,6,1,10.00,'小杯');
insert into sizelist values(null,6,2,14.00,'中杯');
insert into sizelist values(null,6,3,15.00,'大杯');
insert into sizelist values(null,7,1,10.00,'小杯');
insert into sizelist values(null,7,2,14.00,'中杯');
insert into sizelist values(null,7,3,15.00,'大杯');
insert into sizelist values(null,8,1,12.00,'小杯');
insert into sizelist values(null,8,2,14.00,'中杯');
insert into sizelist values(null,8,3,15.00,'大杯');
insert into sizelist values(null,9,1,12.00,'小杯');
insert into sizelist values(null,9,2,14.00,'中杯');
insert into sizelist values(null,9,3,15.00,'大杯');
insert into sizelist values(null,10,1,12.00,'小杯');
insert into sizelist values(null,10,2,14.00,'中杯');
insert into sizelist values(null,10,3,15.00,'大杯');
insert into sizelist values(null,11,1,12.00,'小杯');
insert into sizelist values(null,11,2,14.00,'中杯');
insert into sizelist values(null,11,3,15.00,'大杯');
insert into sizelist values(null,200,1,12.00,'小杯');
insert into sizelist values(null,200,2,14.00,'中杯');
insert into sizelist values(null,200,3,15.00,'大杯');
insert into sizelist values(null,201,1,12.00,'小杯');
insert into sizelist values(null,201,2,14.00,'中杯');
insert into sizelist values(null,201,3,15.00,'大杯');
insert into sizelist values(null,202,1,12.00,'小杯');
insert into sizelist values(null,202,2,14.00,'中杯');
insert into sizelist values(null,202,3,15.00,'大杯');
insert into sizelist values(null,203,1,12.00,'小杯');
insert into sizelist values(null,203,2,14.00,'中杯');
insert into sizelist values(null,203,3,15.00,'大杯');


# 列表名称
create table typelist(
    id int primary key auto_increment,
    tlid int,
    img varchar(128),
    title varchar(16)
);
insert into typelist values(null,1001,'/images/menuicon01.png','现磨咖啡');
insert into typelist values(null,1002,'/images/menuicon01.png','遇冬');
insert into typelist values(null,1003,'/images/menuicon01.png','醇香趣');
insert into typelist values(null,1004,'/images/menuicon01.png','鲜果茶');
insert into typelist values(null,1005,'/images/menuicon01.png','缤纷果汁');
insert into typelist values(null,1006,'/images/menuicon01.png','云顶奶盖');
insert into typelist values(null,1007,'/images/menuicon01.png','动感趣');
insert into typelist values(null,1008,'/images/menuicon01.png','甜点');

#用户列表
CREATE TABLE user(
  id int primary key auto_increment,
  openid varchar(32),
  ubalance  decimal(8,2)
);

insert into user values(NULL,'oS7Gm5Lh8w9r6mKzSnUN3_alG1Io',999999.00);

# 管理员
create table adminlist(
  alid int primary key auto_increment,
  id int,
  aname varchar(16),
  apwd varchar(16)
);
insert into adminlist values(null,1,'admin','123456');