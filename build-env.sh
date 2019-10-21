FILE="./.env"

if [[ $TRAVIS_BRANCH == 'production' ]]; then
cat <<EOM >$FILE
REACT_APP_API_PATH=https://us-central1-nearlywedded-28143.cloudfunctions.net/api/
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
cat <<EOM >$FILE
REACT_APP_API_PATH=https://us-central1-staging-nearlywedded.cloudfunctions.net/api/
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
else
    exit 0
fi