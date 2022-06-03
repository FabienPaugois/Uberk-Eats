-- Data Manipulation Uberk-eats

INSERT INTO ROLES VALUES ('Admin'),
					     ('User'),
						 ('RestaurantOwner'),
						 ('DevileryMan'),
						 ('Dev'),
						 ('CommercialService'),
						 ('TechnicalService')
GO

INSERT INTO USERS VALUES ('Alexandre','Temperville','at@gmail.com','0622758465'),
                         ('Thibault','Perquis','tp@gmail.com','0622758465'),
						 ('Romain','Brunelot','rb@gmail.com','0622758465'),
						 ('Alix','Pouchain','ap@gmail.com','0622758465'),
						 ('Sonia','Ikken','si@gmail.com','0622758465'),
						 ('Anne-Sophie','Dufour','asd@gmail.com','0622758465'),
						 ('Jean-Francois','Hoquet','jfh@gmail.com','0622758465')
GO

INSERT INTO USERROLES VALUES (1,1),
						     (1,2),
	                         (2,2),
							 (2,3),
							 (3,2),
							 (3,4),
							 (4,2),
							 (4,5),
							 (5,2),
							 (5,6),
							 (6,2),
						  	 (7,2),
                             (7,7)
							
							