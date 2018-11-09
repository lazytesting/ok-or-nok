# README
I created this project for my talk 'Ok or Nok: Let the AI decide'.
The primary goal is to start expirimenting with an AI in testing.

## Creating training set

### Run the test app
```
cd example app
npm i
npm start
```
Now the testapp will run on port 1337

### Create a trainingset
1. Edit the mutation rules
- In create-training-set/rules edit the ok.json and nok.json.
- In the replaceValue you can use nunjucks templates

2. Run it
```
cd create-training-set
npm i
npm run training-ok
npm run training-nok
npm run test-ok
npm run test-nok
```

## Train the model
```
cd train-model
python train.py
```

## Use the model
Edit this line in use.py to point to the image you would like to classify:
```
test_image = image.load_img('./images/image_2.png', target_size = (64, 64))
```
Then execute the script:
```
cd train-model
python use.py
```
