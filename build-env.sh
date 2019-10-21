if [[ $TRAVIS_BRANCH == 'production' ]]; then
  REACT_APP_API_PATH=https://us-central1-nearlywedded-28143.cloudfunctions.net/api/
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
  REACT_APP_API_PATH=https://us-central1-staging-nearlywedded.cloudfunctions.net/api/
else
    exit 0
fi