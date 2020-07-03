import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from 'components/loading/Loading';
import { settingsLabelName } from 'constants/cardSettings';
import isPossibilitySwitch from 'utils/isPossibilitySwitch';
import { getSettings, putSettings, getStats } from './HomeApi';
import HomeStatus from './components/homeStatus/HomeStatus';
import CardSettings from './components/cardSettings/CardSettings';

import {
  initialSettings,
  settingsLabelName,
} from '../../constants/cardSettingsData';

import './Home.scss';

export const Home = () => {
  const history = useHistory();

  const [settings, setSettings] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function getHomeData() {
      const receivedSettings = await getSettings();
      const receivedStats = await getStats();

      if (receivedSettings && receivedStats) {
        setSettings(receivedSettings);
        setStats(receivedStats);
      } else {
        history.push('/404');
      }
    }

    getHomeData();
  }, [history]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    if (settings) {
      const timeout = setTimeout(() => {
        putSettings(settings);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [settings]);

  const handleOnChangeSelect = useCallback(
    (event, tag) => {
      const selectedValue = Number(event.target.value);

      const newSettings = {
        ...settings,
        optional: {
          ...settings.optional,
          newWordsPerDay: selectedValue,
        },
      };

      if (tag === settingsLabelName.maxWordsPerDay.en) {
        setSettings({
          ...newSettings,
          wordsPerDay: selectedValue,
        });
      } else {
        setSettings(newSettings);
      }
    },
    [settings],
  );

  const handleOnChangeSwitcher = useCallback(
    (option, categoryLabel) => {
      const oldValue = settings.optional[categoryLabel][option];

      if (categoryLabel === settingsLabelName.cardMainInfo.en) {
        if (!isPossibilitySwitch(settings.optional.cardMainInfo, option)) {
          return false;
        }
      }

      setSettings({
        ...settings,
        optional: {
          ...settings.optional,
          [categoryLabel]: {
            ...settings.optional[categoryLabel],
            [option]: !oldValue,
          },
        },
      });
    },
    [settings],
  );

  return (
    <div className='home'>
      <div className='home-container container'>
        {settings && stats ? (
          <>
            <HomeStatus stats={stats} totalCardsPerDay={settings.wordsPerDay} />

            <CardSettings
              settings={settings}
              handleOnChangeSelect={handleOnChangeSelect}
              handleOnChangeSwitcher={handleOnChangeSwitcher}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Home;
