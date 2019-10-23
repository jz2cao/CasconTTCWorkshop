# CasconTTCWorkshop
This is a project for Cascon / Evoke

UI for our prediction app:

<img width="1657" alt="Screen Shot 2019-10-16 at 5 03 31 PM" src="https://user-images.githubusercontent.com/2717342/66959546-98913a00-f038-11e9-82d5-71cf17cae103.png">

In Watson Studio after creating an account and project <<<<< TODO 

Click New Data Asset, then on the right of the screen a window will appear. Drag the ttc_subway_2018.csv into this window.This window will indicate wether the upload is successful or not. Now close the window. 

Now add a notebook to your project by clicking on add to project and then selecting notebook. This notebook should be the notebook we have provided so make sure to click "from file" below "New Notbook". Now add a name, a description, and the file from your computer. Then click create notebook. 

Now you are in the notebook. First click on the vertically stacked dots on the top right of the screen, and click "Insert Project Token". Since you don't have one a dialogue will pop up. Clickk on the hyperlink to be taken to a new page. Here you just need to click create project token and give the token editing access. Now go back to your notebook and insert the project token. 

Now lets import the data into our project. By clicking the box that is made up of 1's and 0's in the top right corner. Then click on the one file in there, and click insert to pandas dataframe. 

Now just copy data from the insert data cell to the below cell. 

Run the whole notebook, and you will have a fully processed dataset. 


