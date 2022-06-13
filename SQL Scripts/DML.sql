-- Data Manipulation Uberk-eats

INSERT INTO ROLES VALUES ('Admin'),
					     ('User'),
						 ('RestaurantOwner'),
						 ('DeliveryMan'),
						 ('Dev'),
						 ('CommercialService'),
						 ('TechnicalService')
GO

INSERT INTO USERS VALUES ('Alexandre','Temperville','at@gmail.com','0622758465', 'mdpat'),
                         ('Thibault','Perquis','tp@gmail.com','0622758465', 'mdptp'),
						 ('Romain','Brunelot','rb@gmail.com','0622758465', 'mdprb'),
						 ('Alix','Pouchain','ap@gmail.com','0622758465', 'mdpap'),
						 ('Sonia','Ikken','si@gmail.com','0622758465', 'mdpsi'),
						 ('Anne-Sophie','Dufour','asd@gmail.com','0622758465', 'mdpasd'),
						 ('Jean-Francois','Hoquet','jfh@gmail.com','0622758465', 'mdpjfh')
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
							
							