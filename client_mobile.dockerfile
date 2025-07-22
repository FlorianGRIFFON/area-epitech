FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY AREA-MOBILE/android /app

# Install node 18.13.0
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN npm install

RUN yes | sdkmanager --licenses

WORKDIR /app/android
RUN ./gradlew clean
RUN ./gradlew assembleRelease -Dorg.gradle.jvmargs="-Xmx4096m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8"

RUN cp /app/android/app/build/outputs/apk/release/app-release.apk ../shared/area.apk
