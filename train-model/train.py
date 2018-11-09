#cats&dogs : https://becominghuman.ai/building-an-image-classifier-using-deep-learning-in-python-totally-from-a-beginners-perspective-be8dbaf22dd8

# Importing the Keras libraries and packages
from keras.models import Sequential
from keras.layers import Conv2D
from keras.layers import MaxPooling2D
from keras.layers import Flatten
from keras.layers import Dense
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import Dropout
from IPython import embed


classifier = Sequential()

# Convolution
classifier.add(Conv2D(32, (3, 3), input_shape = (64, 64, 3), activation = 'relu'))

# Pooling
classifier.add(MaxPooling2D(pool_size = (2, 2)))

# Flatten
classifier.add(Flatten())

# Fully connected layer
classifier.add(Dense(units = 128, activation = 'relu'))
classifier.add(Dropout(0.2))

# Output layer
classifier.add(Dense(units = 1, activation = 'sigmoid'))

# Compile
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])

# Preprocessing
train_datagen = ImageDataGenerator(rescale = 1./255,
    shear_range = 0.2,
    zoom_range = 0.2,
    horizontal_flip = True)
test_datagen = ImageDataGenerator(rescale = 1./255)
training_set = train_datagen.flow_from_directory('../create-training-set/results/training',
#training_set = train_datagen.flow_from_directory('./training_set',
    target_size = (64, 64),
    batch_size = 32,
    class_mode = 'binary')
test_set = test_datagen.flow_from_directory('../create-training-set/results/test',
#test_set = test_datagen.flow_from_directory('./test_set',
    target_size = (64, 64),
    batch_size = 32,
    class_mode = 'binary')
# embed()

# Feed the data
classifier.fit_generator(training_set,
    steps_per_epoch = 8000, #todo
    epochs = 7, #todo
    validation_data = test_set,
    validation_steps = 2000) #todo


# opslaan
model_json = classifier.to_json()
with open("model.json", "w") as json_file:
    json_file.write(model_json)
# serialize weights to HDF5
classifier.save_weights("model.h5")
print("Saved model to disk")
