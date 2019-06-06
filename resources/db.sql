CREATE DATABASE News

CREATE TABLE IF NOT EXISTS account
(
    `username` VARCHAR(32),
    `password` VARCHAR(100),
    `is_login` BIT,
    `level` INT,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS article_pending
(
    `header` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `content` VARCHAR(12000) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `abstract` VARCHAR(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `image` VARCHAR(255),
    `writerId` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci
);

CREATE TABLE IF NOT EXISTS article
(
    `header` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `content` VARCHAR(12000) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `abstract` VARCHAR(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `image` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `view` INT,
    `date` DATETIME,
    `cat` INT,
    `subcat` INT,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS comment
(
    `date` DATETIME,
    `content` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `articleID` VARCHAR(255),
    `ID` VARCHAR(20) PRIMARY KEY,
    `username` VARCHAR(32)

);

CREATE TABLE IF NOT EXISTS category
(
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS subcategory
(
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `belongto` INT,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS tag
(
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

INSERT INTO `category` (`name`) VALUE ('Kinh doanh');
INSERT INTO `category` (`name`) VALUE ('Chính trị');
INSERT INTO `category` (`name`) VALUE ('Khoa học');
INSERT INTO `category` (`name`) VALUE ('Xã hội');

INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Nông sản',1);
INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Hải sản',1);
INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Trong nước',2);
INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Ngoài nước',2);
INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Công nghệ',3);
INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Tự nhiên',3);
INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Đời sống',4);
INSERT INTO `subcategory` (`name`,`belongto`) VALUE ('Hài hước',4);

INSERT INTO `article` (`header`, `content`, `abstract`, `image`,`view`,`date`,`cat`,`subcat`) VALUE
('Đà Nẵng đưa vào hoạt động dự án khu công nghệ thông tin', '<p><img src="http://dev.cdn.sgt.tamminh.tech/sgt/1553959063490-d554f_img20190329102811.jpg"></p><p><em>Cổng vào Khu Công nghệ thông tin Đà Nẵng (DITP) tại huyện Hòa Vang, thành phố Đà Nẵng. Ảnh: Nhân Tâm</em></p><p>Theo Công ty cổ phần Phát triển Khu công nghệ thông tin Đà Nẵng, chủ đầu tư dự án, DITP có tổng diện tích là 341 ha với tổng vốn đầu tư 2.744 tỉ đồng, trong đó giai đoạn 1 của dự án rộng 131 ha với vốn đầu tư 1.062 tỉ đồng.</p><p>Đây là dự án được đầu tư xây dựng theo mô hình Thung lũng Silicon (Mỹ) và Công viên Khoa học Tân Trúc (Đài Loan). Mục tiêu của dự án là thu hút các công ty lớn, vừa và nhỏ trong lĩnh vực công nghệ cao. Thời điểm hiện tại, các công ty lớn như IBM, Cisco, Intel, KDDI, Mitsui và một số công ty về công nghệ thông tin (CNTT) của Nhật Bản, Mỹ và Singapore đã bày tỏ quan tâm đến Đà Nẵng và DITP.</p><p>Ông Nguyễn Anh Huy, Tổng giám đốc công ty, cho biết với mục tiêu đạt doanh thu 1,5 tỉ đô la/năm và khả năng tuyển dụng 25.000 lao động, DITP sẽ góp phần thu hút các nhà khoa học, kỹ sư, các chuyên gia về công nghệ trong và ngoài nước về làm việc, khuyến khích đào tạo các ngành công nghệ cao tại các trường đại học.</p><p>“Chúng tôi muốn thành phố sớm giao mặt bằng, hỗ trợ các thủ tục liên quan để nhà đầu tư có thể sớm triển khai hạ tầng kỹ thuật giai đoạn 2 trong năm nay”, ông Huy nói và cho biết thêm hạ tầng kỹ thuật của giai đoạn 1 đã hoàn tất và sẵn sàng đón nhà đầu tư.</p><p>Phát biểu tại buổi lễ, Phó Thủ tướng Vũ Đức Đam cho biết ông hy vọng DITP sẽ sớm trở thành khu công nghệ thông tin tập trung thứ 5 và lớn nhất trên cả nước. Bốn khu còn lại là Công viên Phần mềm Quang Trung (TPHCM), Công viên Phần mềm Đà Nẵng (Đà Nẵng), Khu CNTT tập trung Cầu Giấy và Công viên Công nghệ phần mềm Hà Nội (Hà Nội).</p><p>Được biết dự án DITP được khởi công vào năm 2013, do Tập đoàn Rocky Lai &amp; Associates - Đà Nẵng và các nhà đầu tư tại Mỹ nắm giữ 65% cổ phần. Sau thời gian triển khai, dự án chậm tiến độ do gặp khó khăn về tài chính. Cuối năm 2017, Công ty cổ phần Phát triển Khu công nghệ thông tin Đà Nẵng đã mua lại 65% cổ phần này.</p>', 
'(TBKTSG Online) - Giai đoạn một của dự án Khu công nghệ thông tin Đà Nẵng (DITP) đã được khánh thành sáng nay, 29-3, tại huyện Hòa Vang, thành phố Đà Nẵng sau 6 năm kể từ ngày khởi công do chuyển đổi nhà đầu tư.',
'<img src="http://dev.cdn.sgt.tamminh.tech/sgt/1553959063490-d554f_img20190329102811.jpg">',
0,2018-6-90, 3, 3);