This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
UI library is using `semantic-ui`
## To begin
Just use `npm i` to install and `npm start` to run

## Some notes
- Front-end and Server are separated, you need to open them one by one, sorry for the inconvenience, web page will try looking for port `2019`
- I did not implement renew token action, so page will stop working after half hour. I was thinking to do it with `react-route` but that seems quite a lot for a simple function page, and stay at this page for half hour is quite challenge so I didn't do it :P 
- UX could get better, for example `429 error` won't show any message to tell user on the web if user change amount too frequently.
- I don't know if the way I do the conversion is correct, I check the way google do it is `0.014` -> `0.01` & `0.015` -> `0.02`, so I follow the same.