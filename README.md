# CEN3031_Fantastic_Four
S16799 Group 7 - UniCalendar

Jahkiyah Dehaarte - Sensi Dehaarte - Zackary Whalen - Sean Parrell

# To run, you will need to install node:

https://nodejs.org/en/download

I used the Windows Installer (.msi). It's near the bottom in a green box.

Once installed, use the powershell terminal in Visual Studio Code to run the following commands:
# 1. Verfiy Node is installed 
node -v

npm -v

If you get this type of error "File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system." you will need to open Powershell as an Administrator. Then run:  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

Select "Yes to All" by running: A

Restart Visual Studio Code and the issue should be fixed.

# 2. Clone the project (if not already cloned)
git clone https://github.com/zackwhalen1/CEN3031_Fantastic_Four.git

cd CEN3031_Fantastic_Four/unicalendar

# 3. Install dependencies 
npm install

# 4. Run it
npm start

# 5. Login Information
If you would like to login as a student, you can use this login information:

username: student@ufl.edu

password: password


If you would like to login as an administrator, click on the Administrator Login button and use this login information:

username: Admin

password: password
