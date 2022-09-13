# google-trends
Node.js script, which queries Google API trends, in order to get daily and weekly trends, in between a given period, and around a keyword.

1. The idea
I want to create CSV files with daily and weekly Google trending information, about the keyword 'bitcoin'. 
So, I take advantage of a library which already resolves the API querying problem, and I want to use a CSV npm package as well. 

2. Time spent 
I spent in this script around 4 or 5 hours, including time facing with libraries documentation, trying different approachs, and preparing this repository.

3. Different approachs
My first attempt was to query about 'bitcoin', from 2015-01-01 to now, with a daily resolution.
Then, I could query once, and then iterate the result in order to have daily and weekly information. 
I expected that I had been able to select the resolution of the information I was querying, but it wasn't possible.
So, I faced the decision of choosing among several API calls or more processing efforts.

4. Current approach
Since Google API trends selects itself the proper resolution for the query, what is based on the period which is queried, I went for the approach that:
For weekly trends, I call the API for a year period (since I get a weekly resolution easily).
For daily trends, I call the API for a semester period (since I get a daily resolution easily).
Later, I merge the information and create a new single object with the information I need, in order to be saved to both CSV files.

5. How to execute this program
- Install NODE >= v8
- Download files to a new folder
- Run `npm install` to download dependencies
- Run `node app.js` to run the script
- Visit `http://localhost:3000` and pay attention to node console logs
- Resulting files will be created into the same folder
