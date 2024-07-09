import  { Fragment } from 'react';
import { Breadcrumb} from "react-bootstrap";

export default function Pageheader(Props:any) {
  return (
    <Fragment>

<div className="breadcrumb-header justify-content-between">
<div className="left-content">
  <span className="main-content-title mg-b-0 mg-b-lg-1">{Props.title}</span>
</div>
<div className="justify-content-center mt-2">
  <Breadcrumb>
    <Breadcrumb.Item className=" tx-15" href="#">
    {Props.heading}
    </Breadcrumb.Item>
    <Breadcrumb.Item active aria-current="page">
      {Props.active}
    </Breadcrumb.Item>
  </Breadcrumb>
</div>
</div>

    </Fragment>
  );
}

