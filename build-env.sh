FILE="./.env"

if [[ $TRAVIS_BRANCH == 'production' ]]; then
cat <<EOM >$FILE
REACT_APP_API_KEY=AIzaSyCyWpKCSFYD4RW5MAbYbEdfhoUiDt6trkE
REACT_APP_AUTH_DOMAIN=nearlywedded-28143.firebaseapp.com
REACT_APP_DATABASE_URL=https://nearlywedded-28143.firebaseio.com
REACT_APP_PROJECT_ID=nearlywedded-28143
REACT_APP_STORAGE_BUCKET=nearlywedded-28143.appspot.com
REACT_APP_MESSAGING_SENDER_ID=533709700072
REACT_APP_APP_ID=1:533709700072:web:83495addff619af7ac825d
REACT_APP_MEASUREMENT_ID=G-8G3S3M5N37
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
cat <<EOM >$FILE
REACT_APP_API_KEY=AIzaSyD6aN6TYIRHnTw9q-mrbaDu9NYAAraV66M
REACT_APP_AUTH_DOMAIN=staging-nearlywedded.firebaseapp.com
REACT_APP_DATABASE_URL=https://staging-nearlywedded.firebaseio.com
REACT_APP_PROJECT_ID=staging-nearlywedded
REACT_APP_STORAGE_BUCKET=staging-nearlywedded.appspot.com
REACT_APP_MESSAGING_SENDER_ID=112074444845
REACT_APP_APP_ID=1:112074444845:web:5ad947c4de2885f85d28a4
REACT_APP_MEASUREMENT_ID=G-Z9RDEN1BCY
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
else
    exit 0
fi
