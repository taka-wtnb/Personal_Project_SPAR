A cross-industry B2B web app to help businesses review and analyze their supply chain management. With this supplier relationship management (SRM) system, we can view our suppliers’ historical performance in terms of on-time delivery (OTD), cost reduction, and quality management. 

For the front-end, I used [Light Blue React Template](https://flatlogic.github.io/light-blue-react-template/) made by [Flatlogic](https://flatlogic.com/) and customized it to develop the SRM system UI. 
I developed the back-end from scratch by using node.js/express.js and PostgreSQL.

[View the App](https://flatlogic.github.io/light-blue-react-template/)

[![image](https://user-images.githubusercontent.com/43149862/78150582-270b4380-7440-11ea-826a-64e99b77d06d.png)](https://flatlogic.github.io/light-blue-react-template/)


This app includes following features and pages:

## Features
* Using charts and tables to easily visualize the supplier performance.
* Enables users to select a supplier whose performance we would like to see. By virtue of state management, the selected supplier persists across the pages for different performance criteria. 
* Enables users to select an item we have purchased from the supplier and view the specific performance unique to the item.
* Also enables users to select a time span (3 months, 6 months, etc.) for view the historical performance of the specific criterion.

## Pages
I have implemented the following pages corresponding to different criteria of the performance.
* Dashboard – showing a selected supplier’s spending amount trend, most ordered items, open orders, pending quality issue cases.  
* On-Time Delivery – showing how well the supplier (or a selected item) has performed on On-Time Delivery (OTD) and its breakdowns for analysis purpose.
* Cost Reduction – showing each purchased item’s price trend and some other data to help users conduct cost-down analysis. 
* Quality Management – showing how many quality issues we have had with the supplier (or a selected item) in recent months as well as its breakdown information for in-depth analysis.


## Tools & Technologies
Front-End:
* React
* Redux
* Bootstrap 4 & SCSS
* [ApexCharts](https://apexcharts.com/)

Server:
* node.js
* express.js
* node-postgres

Database:
* PostgreSQL

This is ver 1.0.0. 
I am going to add more features, such as the user authentication, supplier profile page, order entry & update, and more!