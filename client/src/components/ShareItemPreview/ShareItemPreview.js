import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  console.log(shareItemPreview);
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = state => ({
  shareItemPreview: state.shareItemPreview
});
export default connect(mapStateToProps)(ShareItemPreview);
