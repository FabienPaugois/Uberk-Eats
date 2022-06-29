-- Data Definition Uberk-eats

IF (NOT EXISTS (SELECT * 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'Role'))
BEGIN
    CREATE TABLE [Role](
		Id BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		Name VARCHAR(200) NOT NULL
	)
END
GO

IF (NOT EXISTS (SELECT * 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'User'))
BEGIN
    CREATE TABLE [User](
		Id BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		Name VARCHAR(100) NOT NULL,
		Surname VARCHAR(100) NOT NULL,
		Mail VARCHAR(100) NOT NULL,		
		IsSuspended BIT NOT NULL,
		Phone VARCHAR(20) NOT NULL,
		Password VARCHAR(100) NOT NULL,
		UserAffiliate BIGINT FOREIGN KEY REFERENCES [User](Id)
	)
END
GO

IF (NOT EXISTS (SELECT * 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'UserRole'))
BEGIN
    CREATE TABLE [UserRole](
		Id BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		UserId BIGINT NOT NULL FOREIGN KEY REFERENCES [User](Id) ON DELETE CASCADE,
		RoleId BIGINT NOT NULL FOREIGN KEY REFERENCES [Role](Id) ON DELETE CASCADE
	)
END
GO