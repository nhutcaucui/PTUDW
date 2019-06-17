DROP TABLE account;
DROP TABLE article;
DROP TABLE article_pending;
DROP TABLE comment;
DROP TABLE category;
DROP TABLE subcategory;

CREATE TABLE account
(
    `username` VARCHAR(32),
    `password` VARCHAR(100),
    `flname` VARCHAR(100),
    `alias` VARCHAR(100),
    `birthday` INT,
    `is_login` BIT,
    `level` INT,
    `premium_expired` INT,
    `token` VARCHAR(100),
    `email` VARCHAR(100),
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE article_pending
(
    `header` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `content` VARCHAR(12000) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `abstract` VARCHAR(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `image` VARCHAR(255),
    `cat` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `subcat` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `writerId` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `tag` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `state` INT,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE article
(
    `header` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `content` VARCHAR(12000) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `abstract` VARCHAR(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `image` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `view` INT,
    `date` INT,
    `cat` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `subcat` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `tag` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `premium` BIT,
    `writerId` INT,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE comment
(
    `date` DATETIME,
    `content` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `articleID` INT,
    `ID` VARCHAR(20) PRIMARY KEY,
    `username` VARCHAR(32)
);

CREATE TABLE category
(
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE subcategory
(
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    `belongto` INT,
    `ID` INT AUTO_INCREMENT PRIMARY KEY
);

ALTER TABLE article ADD FULLTEXT(header, content, abstract, tag);

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
'http://dev.cdn.sgt.tamminh.tech/sgt/1553959063490-d554f_img20190329102811.jpg',
200,1525824000, 'Khoa học', 'Công nghệ');

INSERT INTO `article` (`header`, `content`, `abstract`, `image`,`view`,`date`,`cat`,`subcat`) VALUE
('Tư duy làm luật, nhìn từ thông tư "thức ăn chăn nuôi"',
'<p><br></p><p class="ql-align-center"><img src="https://cdn.thesaigontimes.vn/Uploads/Articles/286433/0a0cc_tuduylamluat_thanhoa.jpg"></p><p class="ql-align-center"><em>Một trại nuôi heo ở Đồng Nai. Ảnh: Thành Hoa</em></p><p><strong>Không lập “danh mục cấm” mà lại lập “danh mục cho phép”</strong></p><p>Nhiều cơ quan ban hành văn bản vẫn không thể nhận ra nguyên tắc phổ biến trong hoạt động xây dựng pháp luật, đó là đối với nhiệm vụ, quyền hạn của các cơ quan nhà nước thì cần quy định giới hạn phạm vi, còn đối với những quy định tác động đến người dân trong những trường hợp không thể liệt kê hết được thì chỉ nên lập “danh mục cấm”.</p><p>Không nên lập “danh mục được phép” vì chắc chắn cơ quan soạn thảo sẽ không thể biết và dự liệu hết những vấn đề đang tồn tại và sẽ phát sinh trong thực tế. Khi đưa vào danh mục được phép, được làm, đồng nghĩa với việc “vùng không được làm” rộng gấp ngàn lần vùng được làm. Một xã hội bị “đóng khung” trong các quy định, như quy định của Bộ NN&amp;PTNT thì làm sao phát triển?</p><p>Pháp luật chỉ nên tạo ra khuôn khổ pháp lý để cấm các hành vi vi phạm, còn lại nên là “mảnh đất” để người dân sáng tạo, điều này sẽ kích thích sự phát triển chung của xã hội. Và một điều chắc chắn rằng không cơ quan nào có thể liệt kê đầy đủ được nguyên liệu nào đang được sử dụng trong chăn nuôi theo tập quán của người dân nên dẫn đến nếu áp dụng thông tư trên thì chuối, su hào, cà rốt... không thể làm thức ăn cho gia súc. Điều này thật là vô lý!</p><p>Ngược dòng thời gian, đã có những văn bản gây tranh cãi lớn, như Quyết định 97/2009/QĐ-TTg về Danh mục các lĩnh vực cá nhân được thành lập tổ chức nghiên cứu khoa học, tổ chức nghiên cứu khoa học và phát triển công nghệ. Đáng ra phải lập danh mục cấm như cấm nghiên cứu sinh sản vô tính trên người..., còn lại nên là mảnh đất tự do để kích thích nghiên cứu và sáng tạo.</p><p>Lịch sử đã chứng minh rằng, các thành quả khoa học chúng ta có được ngày hôm nay đều là kết quả của sự nghiên cứu miệt mài từ nhiều người đi trước, mà thời điểm những phát minh sáng tạo đó ra đời vượt qua suy nghĩ và tầm nhìn của nhà làm luật.</p><p>Đây không chỉ là lỗi kỹ thuật, lỗi chính là ở tư duy tiếp cận khi soạn thảo văn bản, nhiều cơ quan luôn đi theo hướng ban hành danh mục cho phép, chứ không phải là danh mục cấm.</p><p><strong>Không mạnh dạn thừa nhận sai sót</strong></p><p><strong>Cần có cơ chế phán quyết về những vi phạm Hiến pháp để cho các chủ thể chịu sự tác động trực tiếp từ các văn bản bất hợp pháp tiến hành khởi kiện tại tòa án, lúc đó, buộc cơ quan ban hành văn bản quy phạm pháp luật phải thận trọng, cân nhắc hơn trước khi đưa ra một chính sách mới.</strong></p><p>Cơ quan ban hành không mạnh dạn thừa nhận sai sót khi ban hành văn bản mà đẩy câu chuyện sang hướng khác.</p><p>Theo trả lời của ông quyền Cục trưởng Cục Chăn nuôi (đơn vị chủ trì soạn thảo Thông tư 02) với báo chí ngày 13-3-2019 thì thông tư ban hành danh mục thức ăn chăn nuôi “được phép lưu hành” chỉ mới có danh mục đợt đầu(1).</p><p>Trong khi đó, đọc cả thông tư không thấy nội dung nào cho thấy đây là “danh mục đợt đầu”. Phát biểu này tạo sự nhập nhằng về cách hiểu, vì trong quy trình ban hành văn bản, không có quy định nào cho phép nhà làm luật ban hành văn bản như sáng tác truyện (có tập 1 rồi đợi tập 2), nếu muốn thì nên giới hạn đối tượng chịu sự điều chỉnh của văn bản...</p><p>Cũng theo ông này, nếu người dân sử dụng các nguyên liệu khác làm thức ăn như rau, bèo, chuối... thì không ảnh hưởng gì. Điều đó làm cho giá trị của thông tư không còn nữa. Tuy nhiên, khi liên hệ qua các nghị định xử phạt vi phạm hành chính trong các lĩnh vực, nếu vi phạm vào những điều như “chưa được phép của cơ quan có thẩm quyền” thì sẽ bị xử phạt. Sự mập mờ trong soạn thảo, trong nội dung trả lời báo chí có khi là “cái bẫy” với người dân.</p><p>Cách đây gần sáu năm, Bộ NN&amp;PTNT cũng đã ban hành thông tư không rõ ràng mà hậu quả là công an tỉnh Hải Dương đã vận dụng sai và họ đã phải bồi thường cho doanh nghiệp 650 triệu đồng vì dừng xe kiểm tra khiến hàng hóa bị hư hỏng.</p><p>Nguyên nhân chính là các cơ quan chức năng tỉnh Hải Dương căn cứ vào Thông tư 32/2012 của bộ này về kiểm dịch đối với hàng thủy sản (họ hiểu mặt hàng bạch tuộc phải được kiểm dịch) nhưng sau đó ông Đỗ Huy Long, Phó trưởng phòng Thanh tra pháp chế của Cục Thú y, lại khẳng định “Thông tư 32, tuy ra sau nhưng không phải để thay thế Thông tư 06 mà là bổ sung, hỗ trợ thêm cho Thông tư 06”(2) (theo Thông tư 06 thì mặt hàng này không phải kiểm dịch).</p><p>Tuy nhiên, khi đọc kỹ Thông tư 32 thì không có chữ nào, điều khoản nào ghi sửa đổi, bổ sung Thông tư 06 cả. Rõ ràng, Thông tư 32 được ban hành không đúng kỹ thuật để thể hiện mục đích nó là văn bản sửa đổi, bổ sung, nhưng người có thẩm quyền đã đẩy trách nhiệm hết cho cơ quan áp dụng.</p><p><strong>Chưa tuân thủ chặt chẽ quy trình, thiếu kỹ năng soạn thảo văn bản</strong></p><p>Nhiều cơ quan ban hành văn bản chưa tuân thủ quy trình ban hành cũng như thiếu kỹ năng soạn văn bản. Để một chính sách mới ra đời cần phải có thẩm định về sự cần thiết, phải đánh giá tác động, phải công khai đầy đủ tài liệu với sự tham gia của các chủ thể có liên quan, các ý kiến phản biện cần được xem xét một cách cẩn trọng.</p><p>Hơn nữa, cần có những chuyên gia về pháp lý bên cạnh chuyên gia về chuyên môn trong lĩnh vực suốt quá trình soạn thảo. Tức là bên cạnh việc phải làm rõ được phạm vi áp dụng, đối tượng áp dụng, nội dung, hiệu lực của văn bản thì phải có kỹ năng về ngôn ngữ pháp lý, kỹ thuật trình bày. Nếu không, sẽ phát sinh những tranh chấp không đáng có.</p><p>Như trường hợp Công ty Vinasun kiện quyết định xử phạt của cơ quan thanh tra giám sát Ngân hàng Nhà nước về hành vi niêm yết bằng ngoại tệ. Mấu chốt trong vụ này là việc xác định thời điểm có hiệu lực của Nghị định 95/2011/NĐ-CP ảnh hưởng trực tiếp đến doanh nghiệp. Theo quy định thì nghị định này phải có hiệu lực không sớm hơn 45 ngày kể từ ngày ký, tức không sớm hơn ngày 5-12-2011, nhưng không hiểu sao trong nghị định lại quy định nó có hiệu lực từ ngày ký, tức ngày 20-10-2011 (trong khi công ty bị lập biên bản vi phạm vào ngày 26-11-2011). Rõ ràng việc xác định sai thời điểm có hiệu lực của văn bản dẫn đến tranh chấp phát sinh. Trách nhiệm pháp lý của cơ quan và cá nhân ban hành văn bản không đúng là vấn đề còn bỏ ngỏ hiện nay.</p><p>Hơn nữa, những người ban hành chính sách nên hiểu rõ rằng, khi muốn đưa ra một chính sách mới, cần phải có luận cứ khoa học, có tư duy tự phản biện lại vấn đề trong một cách hiểu thông thường nhất. Đề xuất chính sách của Bộ trưởng Bộ Giao thông Vận tải gần đây (mất bằng lái xe phải thi lại) là đề xuất ai cũng thấy bất hợp lý, nhưng nó đã được đưa vào trong dự thảo một thông tư. Đến khi dư luận bức xúc thì mới thấy rõ, cơ quan xử phạt vi phạm hành chính và Bộ Giao thông Vận tải không làm việc được với nhau về dữ liệu, nên đẩy toàn bộ cái khó về cho dân.</p><p><strong>Cần có thiết chế tòa án hiến pháp hay hội đồng hiến pháp</strong></p><p>Và một điều cuối cùng, đã đến lúc cần quy định về thiết chế tòa án hiến pháp hay hội đồng hiến pháp ở nước ta hoặc mở rộng thẩm quyền của tòa hành chính, trong đó có quyền thụ lý các khiếu kiện văn bản quy phạm pháp luật. Điều này nhằm thể chế hóa chủ trương của Đảng từ Đại hội X và XI “xây dựng cơ chế phán quyết về những vi phạm Hiến pháp”, đồng thời, cũng nhằm cụ thể hóa cơ chế kiểm soát quyền lực giữa các cơ quan. Bởi vì hiện nay khi người dân bị ảnh hưởng bởi một chính sách, một văn bản quy phạm pháp luật không đúng, họ chỉ có quyền kiến nghị, không có quyền khiếu nại, khởi kiện.</p><p>Còn việc kiểm tra văn bản của các cơ quan hành chính hiện nay phụ thuộc chủ yếu vào cơ chế tự kiểm tra và kiểm tra của chính cơ quan ban hành và Cục Kiểm tra văn bản quy phạm pháp luật của Bộ Tư pháp, nhưng cơ chế này dường như chưa hiệu quả. Quan sát rất nhiều văn bản bất hợp pháp, bất hợp lý trong thời gian qua, dường như vắng bóng sự can thiệp có hiệu quả từ cơ quan nhà nước, mà chịu ảnh hưởng rất lớn từ truyền thông. Khi truyền thông tạo ra dư luận, thì các cơ quan nhà nước “tức tốc” vào cuộc, nhưng chắc chắn còn nhiều văn bản quy phạm pháp luật của các cơ quan khác cũng có “hoàn cảnh” như những văn bản trên nhưng chưa bị phát hiện mà thôi.</p><p>Do vậy, cần có cơ chế phán quyết về những vi phạm hiến pháp để cho các chủ thể chịu sự tác động trực tiếp từ các văn bản bất hợp pháp tiến hành khởi kiện tại tòa án, lúc đó, buộc cơ quan ban hành văn bản quy phạm pháp luật phải thận trọng, cân nhắc hơn trước khi đưa ra một chính sách mới.&nbsp;</p><p class="ql-align-right"><strong><em>(*) Đại học Luật TPHCM</em></strong></p><p class="ql-align-right"><em>(1) https://plo.vn/kinh-te/khong-duoc-nuoi-tho-heo-bang-ca-rot-beo-tay-be-chuoi-821273.html</em></p><p class="ql-align-right"><em>(2) https://tuoitre.vn/hieu-chua-dung-van-ban-luat-dan-san-bach-tuoc-lanh-du-553194.htm</em></p>',
'Những ngày gần đây truyền thông đã đưa tin về những bất cập trong Thông tư 02/2019 của Bộ Nông nghiệp và Phát triển nông thôn (NN&PTNT), ban hành Danh mục sản phẩm thức ăn chăn nuôi theo tập quán và nguyên liệu đơn được phép lưu hành tại Việt Nam. Đọc kỹ thông tư này, cùng các trường hợp đã xảy ra trước đó, có thể thấy những hạn chế về hoạt động lập quy.',
'https://cdn.thesaigontimes.vn/Uploads/Articles/286433/0a0cc_tuduylamluat_thanhoa.jpg',
150,1525824000,'Kinh doanh', 'Nông sản');

INSERT INTO `article` (`header`, `content`, `abstract`, `image`,`view`,`date`,`cat`,`subcat`) VALUE 
('Nhân viên Masan tạo hình Lăng Bác bằng sản phẩm gây tranh cãi',
'<p>Tối 20/4, trên mạng xã hội xuất hiện nhiều hình ảnh chụp quầy trưng bày sản phẩm khuyến mãi là các chai tương ớt Chinsu của Công ty Cổ phần hàng tiêu dùng <a href="https://news.zing.vn/tieu-diem/masan.html" class="topic company autolink quickview tooltipstered" topic-id="4690">Masan</a><span class="stock"><em class="symbol">MSN</em><em class="price">87,900</em><em class="price-old">87,600</em><em class="price-change positive">+0.34%</em><em class="volume">29,224</em></span> (Masan Consumer) tại siêu thị Lotte Liễu Giai (<a href="https://news.zing.vn/tieu-diem/ha-noi.html" class="topic location autolink quickview tooltipstered" topic-id="2208">Hà Nội</a>).</p>
<p>Tuy nhiên, các chai tương ớt này lại được tạo hình mô phỏng theo Lăng Bác khiến nhiều người không đồng tình và cho rằng dùng hình ảnh này để quảng cáo là rất phản cảm.</p>
<p>Trao đổi với <em>Zing.vn</em>, đại diện Masan xác nhận có sự việc như trên diễn ra vào ngày 20/4.</p><div class="banner native" id="body-banner1"></div>
<p>Theo đó, để chào mừng dịp nghỉ lễ lớn 30/4 và 1/5, siêu thị Lotte Liễu Giai đã phát động phong trào trưng bày sản phẩm trong nội bộ siêu thị theo chủ đề chào mừng dịp lễ này. Sau đó, các nhân viên bán hàng và PG (nữ nhân viên tiếp thị sản phẩm) đã sắp xếp mô hình theo chủ đề nói trên để tham gia chào mừng.</p>
<p>"Nhiều sản phẩm của các nhãn hàng khác cũng được các nhân viên tạo hình xe tăng, lá cờ, chùa Một Cột... để chào mừng dịp lễ. Các sản phẩm tuơng ớt Chinsu đã được các bạn PG sắp xếp tạo hình Lăng Bác với tinh thần tưởng nhớ nhưng lại gây hiệu ứng ngược tới người tiêu dùng", vị đại diện này cho biết.</p>
<p>Ngay sau khi tiếp nhận thông tin, Masan  đã làm việc nhân viên sales và PG, yêu cầu tường trình để tìm hiểu nguyên nhân cụ thể. Cùng với đó, công ty cũng yêu cầu tháo gỡ ngay mô hình trưng bày.</p>
<p>Hiện tại, mô hình trên cùng các mô hình cuat nhãn hàng khác cũng đã được phía công ty gỡ bỏ.</p><div class="banner" id="advArticleInread"><div id="adtima-zone-2481475405114470955" z2-zoneid="2481475405114470955" z2-width="1" z2-height="1" z2-type="inread" z2-responsive="true" z2-inread="pc" class="z2-zads-zone"><iframe id="adtimaIFrameWrapper_2481475405114470955" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" class="z2-zad-iframe" src="javascript:&quot;<!DOCTYPE html><html><body style="background:transparent"></body></html>&quot;" style="border: 0px; display: none; overflow: hidden;"></iframe><div id="adtimaDivWrapper_2481475405114470955" style="display: none;"></div></div></div>
<p>"Masan cũng có trách nhiệm trong việc này khi đã không kiểm soát được các nhân viên của mình cũng như việc quảng bá sản phẩm từ các cơ sở", vị này nhấn mạnh.</p><div class="banner native" id="body-banner2"></div>
<p>Ngoài ra, đại diện Masan cũng cho biết sẽ làm việc thêm với phía siêu thị Lotte để tìm hiểu cụ thể sự việc và  tránh lặp lại trong tương lai.</p>
<p>Về phía siêu thị Lotte, sau khi phát hiện ra sự việc, ngay trong chiều 20/4, đơn vị cũng đã làm việc nhà cung cấp là Masan để tiến hành gỡ bỏ  hình ảnh trên.</p>
<p>Quy định tại Điều 8, Luật Quảng cáo nêu rõ những hành vi bị cấm trong hoạt động quảng cáo với các tổ chức, cá nhân.</p>
<p>Trong đó bao gồm nghiêm cấm quảng cáo thiếu thẩm mỹ, trái với truyền thống lịch sử, văn hóa, đạo đức và thuần phong mỹ tục Việt Nam. Cấm các quảng cáo gây ảnh hưởng xấu đến sự tôn nghiêm đối với Quốc kỳ, Quốc huy, Quốc ca, Đảng kỳ, anh hùng dân tộc, danh nhân văn hóa, lãnh tụ, lãnh đạo Đảng, Nhà nước…</p>
<p>Cũng theo đó, nếu tổ chức, cá nhân nào có hành vi vi phạm quy định của Luật này và các quy định khác của pháp luật có liên quan thì tùy theo tính chất, mức độ vi phạm mà bị xử phạt vi phạm hành chính. Trong trường hợp gây thiệt hại thì phải bồi thường theo quy định của pháp luật.</p>',
'Sau sự kiện hơn 18.000 chai tương ớt Chinsu bị thu hồi tại Nhật Bản, mới đây Masan tiếp tục gặp thêm rắc rối liên quan sản phẩm này.',
'https://znews-photo.zadn.vn/w660/Uploaded/aohunkx/2019_04_21/28d79ae748bcade2f4ad.jpg',
100,1525824000,'Xã hội', 'Đời sống');

INSERT INTO `article` (`header`, `content`, `abstract`, `image`,`view`,`date`,`cat`,`subcat`) VALUE 
('“Đời là ba chữ T”', 
'<p class="ql-align-center"><strong><img src="https://cdn.thesaigontimes.vn/Uploads/Articles/285928/4b809_e3.jpg"></strong></p><p class="ql-align-justify"><em>﻿Đến một ngưỡng nào đó, đồng tiền không còn tỷ lệ thuận với tình cảm và hạnh phúc nó mang đến cho người giữ nó. Ảnh minh họa Thành Hoa</em></p><p class="ql-align-justify">Dù cuộc đời gắn liền với tiền bạc là điều hiển nhiên, mối quan hệ tay ba giữa tiền - tình - “tê tê” (sung sướng/hạnh phúc), chưa bao giờ là một chủ đề thôi gây tranh cãi. Vì thế, khi một nhân vật chính trong vụ ly hôn được xem là một trong những vụ phân chia tài sản “đắt giá” nhất Việt Nam thốt lên câu cảm thán về tiền (“Tiền để làm gì? Nhiều tiền để làm gì?”), lập tức câu hỏi này trở thành đề tài bàn tán trên nhiều tờ báo mạng. Nhân Ngày Phụ nữ quốc tế 8-3 sẽ đến vào ngày mai, cũng xin lạm bàn đôi điều về chủ đề này.</p><p class="ql-align-justify">Trước hết, “tiền để làm gì, nhiều tiền để làm gì?”. Theo tác giả, đây chỉ là một lời cảm thán từ người phát ngôn, có thể được xem như là một “rhetoric question” (câu hỏi có ý nghĩa nhấn mạnh, hỏi chỉ để hỏi chứ không phải để nhận câu trả lời), người ta thốt lên vì tự thương cảm cho hoàn cảnh gia đình mình. Thế nhưng, dân mạng trả lời câu này rất nhiệt tình, có người bông đùa, có người nghiêm túc. Tựu trung, nhiều người cho rằng tiền có sức mạnh vạn năng, giúp người nhiều tiền tìm được hạnh phúc, quyền lực, an toàn, tự do và cả sự kính trọng. Đó cũng là những “công dụng” của tiền được số đông đồng ý.</p><p class="ql-align-justify">Ở Việt Nam, khẩu hiệu “dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh” là một mục tiêu để phấn đấu. Đã qua rồi thời đại mà giàu bị xem là có tội. Dân còn nghèo thì nước không thể mạnh, và các hệ quả tiếp theo như công bằng, dân chủ, văn minh xem ra cũng khó mà đạt được. Và đơn giản muốn giàu thì phải có tiền. Vậy nên, một trong những lý do để có tiền là để người dân được giàu có, để đất nước được hùng cường làm tiền đề cho một xã hội công bằng, dân chủ, văn minh.</p><p class="ql-align-justify">Thứ hai, tiền có mua được hạnh phúc không? Trong một chừng mực nào đó, câu trả lời là “có”. Dễ hiểu thôi, nếu tôi có nhiều tiền hơn, tôi sẽ có đời sống tiện nghi vật chất tốt hơn, giúp tôi cảm thấy hạnh phúc hơn. Như đã nói ở trên, nhờ tiền tôi và gia đình sẽ đạt được các điều kiện cần thiết trong đời sống, như nhà ở, giáo dục, chăm sóc sức khỏe, an toàn bản thân...</p><p class="ql-align-justify">Tuy nhiên, cảm giác hạnh phúc vì có nhiều tiền không tăng lên mãi mãi. Đến một ngưỡng nào đó, đồng tiền không còn tỷ lệ thuận với tình cảm và hạnh phúc nó mang đến cho người giữ nó. Vậy thì ngưỡng đó là bao nhiêu?</p><p class="ql-align-justify">Theo một nghiên cứu năm 2010, ngưỡng nói trên ở Mỹ là 75.000 đô la một năm (khoảng 84.000 đô la vào năm 2016, đã tính trượt giá) (*). Cũng vào năm 2016, một công trình nghiên cứu khác được thực hiện trên khoảng 1 triệu người ở nhiều quốc gia trên thế giới. Đối tượng tham gia được phỏng vấn về đời sống của họ theo thang điểm từ 0 đến 10.</p><p class="ql-align-justify">Các nhà nghiên cứu phân tích mối liên quan giữa các con số từ bảng trả lời và thu nhập của các gia đình. Họ khám phá ra rằng ở khắp nơi, người ta thấy hạnh phúc hơn khi thu nhập cao hơn. Nhưng các nhà nghiên cứu cũng thấy rằng hạnh phúc không tăng mãi với thu nhập, thậm chí nhiều trường hợp còn giảm khi thu nhập tăng. Ngưỡng bão hòa này dao động từ 35.000 đô la (mức thấp nhất, ở các nước Mỹ Latinh và vùng Caribê) đến 125.000 đô la (mức cao nhất, ở Úc và New Zealand).</p><p class="ql-align-justify">Điều này cũng rất phù hợp với thực tế, vì nếu không, các tỉ phú ở khắp thế giới sẽ là những người hạnh phúc nhất thế giới rồi; nhưng không, họ không phải là những người hạnh phúc nhất thế giới, họ chỉ là những người giàu nhất thế giới mà thôi.</p><p class="ql-align-justify">Chưa thấy Việt Nam có nghiên cứu tương tự để chỉ ra đâu là “ngưỡng giàu mang lại hạnh phúc cho người Việt”, nhưng không phải cứ càng giàu là sẽ càng hạnh phúc. Vụ ly hôn kể ở đầu bài viết này há không phải là một phản biện thuyết phục cho quan điểm “giàu là hạnh phúc” hay sao?</p><p class="ql-align-justify">Không biết nếu nghệ sĩ Ba Vân còn sống đến nay (mất năm 1988), ông có chịu sửa câu nói nổi tiếng của mình hay không.</p><p class="ql-align-right"><sup><em>(*)&nbsp;</em></sup><em>https://qz.com/1211957/how-much-money-do-people-need-to-be-happy/</em></p>',
'Không khó lắm để tìm trên mạng những giai thoại về Ba Vân, nghệ sĩ hài đã nổi danh trước năm 1975, với câu nói cửa miệng: “Đời là ba chữ T. Có tiền thì sẽ có tình. Có tiền, có tình thì mặc sức mà tê tê”. Ba Vân được truyền tụng là thường nói câu này.',
'https://cdn.thesaigontimes.vn/Uploads/Articles/285928/4b809_e3.jpg',
50,1525824000,'Xã hội', 'Hài hước');