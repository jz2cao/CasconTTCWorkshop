# CasconTTCWorkshop
This is a project for Cascon / Evoke

UI for our prediction app:

<img width="1173" alt="Screen Shot 2019-10-23 at 10 54 53 AM" src="https://user-images.githubusercontent.com/2717342/67449304-bf76df80-f5e7-11e9-8d41-8018769a7205.png">

In Watson Studio after creating an account and project <<<<< TODO 

Click New Data Asset, then on the right of the screen a window will appear. Drag the ttc_subway_2018.csv into this window.This window will indicate wether the upload is successful or not. Now close the window. 

<img width="1591" alt="1" src="https://user-images.githubusercontent.com/38026494/67409084-1220af00-f588-11e9-849e-a33833af1033.png">

<img width="1220" alt="2" src="https://user-images.githubusercontent.com/38026494/67409143-295f9c80-f588-11e9-91f8-72c3307007c5.png">

Now add a notebook to your project by clicking on add to project and then selecting notebook. This notebook should be the notebook we have provided so make sure to click "from file" below "New Notbook". Now add a name, a description, and the file from your computer. Then click create notebook. 

<img width="1223" alt="3" src="https://user-images.githubusercontent.com/38026494/67409304-61ff7600-f588-11e9-89ba-267715bc44a4.png">


<img width="984" alt="4" src="https://user-images.githubusercontent.com/38026494/67409342-72175580-f588-11e9-8262-de43515d2811.png">


<img width="524" alt="5" src="https://user-images.githubusercontent.com/38026494/67409388-84918f00-f588-11e9-8768-927755da3fb1.png">

Now you are in the notebook. First click on the vertically stacked dots on the top right of the screen, and click "Insert Project Token". Since you don't have one a dialogue will pop up. Clickk on the hyperlink to be taken to a new page. Here you just need to click create project token and give the token editing access. Now go back to your notebook and insert the project token. 


Now lets import the data into our project. By clicking the box that is made up of 1's and 0's in the top right corner. Then click on the one file in there, and click insert to pandas dataframe. 


<img width="422" alt="6" src="https://user-images.githubusercontent.com/38026494/67409430-91ae7e00-f588-11e9-99f9-732bb634ea1f.png">

Now just copy data from the insert data cell to the below cell. 

Run the whole notebook, and you will have a fully processed dataset. 


