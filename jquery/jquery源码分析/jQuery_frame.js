//��window��Χ�ڶ�����һ��������jQuery���������������ʲô�أ�����return ��䣬�����ö�������Ǹ���������
var jQuery = (function () {
    //���jQuery��һ���������󣬵�����дjQuery("id")ʱ���ߵľ��Ǹ÷������÷����᷵��һ��������ʲô�������˵����
    var jQuery = function () {
        return new XXX();
    }
    //prototype�����������3���������Ƕ��󷽷���ʵ�������� ������fn������jQuery���������һ������
    // ����������3�����������ǿ���ֱ��jQuery.fn.XXX()�������ã��ɼ���3������Ҳ���Կ�����̬���߷�����
    jQuery.fn = jQuery.prototype = {
        XXX: YYY(){
        },
        XXX:YYY(){
        },
        XXX:YYY(){
        }
    }
    //�����extend�������뵽fn��ͷȥ������ͬʱҲ��extend�ŵ�ʵ����������ȥ�ˡ�����extend�Ľ�������˵��
    jQuery.extend = jQuery.fn.extend = function () {
        STATEMENT;
    }
    //����extend������������  �Ѳ�������Ķ���������thisָ��Ķ����ϣ�Ŀǰ��this��ʲô���Ǻ�������
    // �����������3���������Ǿ�̬���߷�����
    jQuery.extend({
    XXX: YYY()
    {
    }
    ,
    XXX:YYY()
    {
    }
    ,
    XXX:YYY()
    {
    }
    })
    STATEMENT;
    return (window.jQuery = window.$ = jQuery);
})();
