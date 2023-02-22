import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import AdvFilter from '../demos/AdvFilter';

function UserList(props) {
  const title = brand.name + ' - Users';
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <AdvFilter />
    </div>
  );
}

UserList.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(UserList);
