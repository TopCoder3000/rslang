import ROUTS from '../routes';

const imgPath = '/img/';
const usersPath = '/users/';
const wordsPath = '/words/';
const statsPath = '/statistics';
const settingsPath = '/settings';
const groupPath = 'page=';
const wordsPerExampleSentencePath = '&wordsPerExampleSentenceLTE=20';
const wordsPerPagePath = '&wordsPerPage=600';
const githubUserLink = 'https://github.com/';
const userLoginDataKey = 'JWT';
const userSettingsKey = 'settings';
const userStatsKey = 'stats';
const baseAssetsUrl =
  'https://raw.githubusercontent.com/abukato/LearnWords/master/';
const baseWordsUrl = '/words?';
const rsSchoolLink = 'https://rs.school/';

const wordsCountTotal = 3600;
const wordsInGroup = 600;
const countCardsPerDayStep = 10;
const numberOfOption = 10;
const responseStatusNotFound = 404;
const responseStatusInvalidToken = 401;

const sentenceRegExpWithChar = /<.*?>(.+)<.*?>(.)/;
const sentenceRegExp = /<.*?>(.+)<.*?>/;

const navOptions = [
  { route: ROUTS.home, title: 'Home' },
  { route: ROUTS.game, title: 'Game' },
  { route: ROUTS.promo, title: 'Promo' },
  { route: ROUTS.team, title: 'Team' },
];

const navOptionsUnLoginUser = [
  { route: ROUTS.login, title: 'Login' },
  { route: ROUTS.registration, title: 'Registration' },
];

export {
  imgPath,
  githubUserLink,
  navOptions,
  navOptionsUnLoginUser,
  userLoginDataKey,
  rsSchoolLink,
  wordsCountTotal,
  countCardsPerDayStep,
  numberOfOption,
  responseStatusNotFound,
  responseStatusInvalidToken,
  userSettingsKey,
  usersPath,
  statsPath,
  wordsPath,
  settingsPath,
  baseWordsUrl,
  baseAssetsUrl,
  sentenceRegExp,
  sentenceRegExpWithChar,
  userStatsKey,
  groupPath,
  wordsPerExampleSentencePath,
  wordsPerPagePath,
  wordsInGroup,
};
