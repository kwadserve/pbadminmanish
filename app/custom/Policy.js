import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { SourceReader, PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import messages from '../containers/Forms/messages';
import { Wysiwyg, InlineWysiwyg } from '../containers/Forms/demos';

function Policy(props) {
  const title = brand.name + ' - Form';
  const description = brand.desc;
  const docSrc = 'containers/Forms/demos/';
  const { intl } = props;
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
      <PapperBlock
        title="Policy"
        icon="format_color_text"
        desc="Add Policies"
      >
        <div>
          <Wysiwyg />
          {/* <SourceReader componentName={docSrc + 'Wysiwyg.js'} /> */}
        </div>
      </PapperBlock>
      {/* <PapperBlock
        title={intl.formatMessage(messages.editorInlineTitle)}
        icon="chat_bubble"
        desc={intl.formatMessage(messages.editorInlineDesc)}
      >
        <div>
          <InlineWysiwyg />
          <SourceReader componentName={docSrc + 'InlineWysiwyg.js'} />
        </div>
      </PapperBlock> */}
    </div>
  );
}

Policy.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(Policy);
