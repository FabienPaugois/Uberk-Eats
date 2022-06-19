-- Data Manipulation Uberk-eats

INSERT INTO [ROLE] VALUES ('Admin'),
					     ('Client'),
						 ('Restaurant Owner'),
						 ('Deliveryman'),
						 ('Dev'),
						 ('Commercial Service'),
						 ('Technical Service')
GO

INSERT INTO [USER] VALUES ('Alexandre','Temperville','at@gmail.com','0622758465', 'mdpat', NULL),
                         ('Thibault','Perquis','tp@gmail.com','0622758465', 'mdptp', NULL),
						 ('Romain','Brunelot','rb@gmail.com','0622758465', 'mdprb', NULL),
						 ('Alix','Pouchain','ap@gmail.com','0622758465', 'mdpap', NULL),
						 ('Sonia','Ikken','si@gmail.com','0622758465', 'mdpsi', NULL),
						 ('Anne-Sophie','Dufour','asd@gmail.com','0622758465', 'mdpasd', NULL),
						 ('Jean-Francois','Hoquet','jfh@gmail.com','0622758465', 'mdpjfh', NULL)
GO

INSERT INTO [USERROLE] VALUES (1,1),
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
							
							